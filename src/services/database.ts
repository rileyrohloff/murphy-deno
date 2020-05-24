import { Client } from "https://deno.land/x/postgres/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import ShortUniqueId from "https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts";

config({
  export: true,
});

export const client = new Client({
  user: Deno.env.get("DB_USERNAME"),
  password: Deno.env.get("DB_PASSWORD"),
  database: Deno.env.get("DB_NAME"),
  hostname: "localhost" || Deno.env.get("DB_HOST"),
  port: 5432,
});

export const getUser = async (userid: string): Promise<any> => {
  await client.connect();
  const getUserCall = await client.query(`SELECT username, id FROM public.users
  WHERE id = '${userid}';`);

  if (getUserCall.rowsOfObjects().length > 0) {
    return getUserCall.rowsOfObjects()[0];
  } else {
    return false;
  }
};

export const getAllUsers = async (): Promise<any> => {
  await client.connect();
  const query = await client.query('SELECT username, id FROM public."users";');
  await client.end();
  return query.rowsOfObjects();
};

export const createUser = async (body: object | any): Promise<any> => {
  let { username, password } = body;
  await client.connect();
  const uid = new ShortUniqueId();
  const createUserRecord = await client.query(
    `INSERT INTO public.users(
    username, password, id)
    VALUES ('${username}', '${password}', '${uid(24)}');`,
  );
  await client.end();
  return createUserRecord.done();
};

export const deleteUser = async (uid: object | any): Promise<boolean> => {
  const { id } = uid;
  await client.connect();
  const deleteUserCall = await client.query(`DELETE FROM public.users
  WHERE id = '${id}';`);
  await client.end();
  if (deleteUserCall.rowCount == 0) {
    return false;
  } else {
    return true;
  }
};

export const updateUser = async (
  userId: string,
  data: object | any,
): Promise<any> => {
  await client.connect();
  const queryUser = await getUser(userId);
  console.log(data);

  if (queryUser.id) {
    const updateQuery = await client.query(`UPDATE public.users
    SET username='${data.username}', id='${queryUser.id}'
    WHERE id='${userId}';`);
    console.log(updateQuery.query);
    return updateQuery.rowsOfObjects();
  } else {
    return false;
  }
};
