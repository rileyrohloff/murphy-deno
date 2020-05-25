import { Client } from "https://deno.land/x/postgres/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import ShortUniqueId from "https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts";

config({
  export: true,
});

class DbClient {
  constructor() {
  }
  static client = new Client({
    user: Deno.env.get("DB_USERNAME"),
    password: Deno.env.get("DB_PASSWORD"),
    database: Deno.env.get("DB_NAME"),
    hostname: "localhost" || Deno.env.get("DB_HOST"),
    port: 5432,
  });

  static getUser = async (userid: string): Promise<any> => {
    await DbClient.client.connect();
    const getUserCall = await DbClient.client.query(
      `SELECT username, id FROM public.users
  WHERE id = '${userid}';`,
    );

    if (getUserCall.rowsOfObjects().length > 0) {
      return getUserCall.rowsOfObjects()[0];
    } else {
      return false;
    }
  };

  static getAllUsers = async (): Promise<any> => {
    await DbClient.client.connect();
    const query = await DbClient.client.query(
      'SELECT username, id FROM public."users";',
    );
    await DbClient.client.end();
    return query.rowsOfObjects();
  };

  static createUser = async (body: object | any): Promise<any> => {
    let { username, password } = body;
    await DbClient.client.connect();
    const uid = new ShortUniqueId();
    const createUserRecord = await DbClient.client.query(
      `INSERT INTO public.users(
    username, password, id)
    VALUES ('${username}', '${password}', '${uid(24)}');`,
    );
    await DbClient.client.end();
    return createUserRecord.done();
  };
  static deleteUser = async (uid: object | any): Promise<boolean> => {
    const { id } = uid;
    await DbClient.client.connect();
    const deleteUserCall = await DbClient.client.query(`DELETE FROM public.users
  WHERE id = '${id}';`);
    await DbClient.client.end();
    if (deleteUserCall.rowCount == 0) {
      return false;
    } else {
      return true;
    }
  };

  static updateUser = async (
    userId: string,
    data: object | any,
  ): Promise<any> => {
    await DbClient.client.connect();
    const queryUser = await DbClient.getUser(userId);
    console.log(data);

    if (queryUser.id) {
      let sqlString: string = "";
      for (const prop in data) {
        let string = `${prop}='${data[prop]}', `;
        sqlString += string;
      }

      const updateQuery = await DbClient.client.query(`UPDATE public.users
    SET username='${data.username}', id='${queryUser.id}'
    WHERE id='${userId}';`);
      console.log(updateQuery.query);
      return updateQuery.rowsOfObjects();
    } else {
      return false;
    }
  };
}

export default DbClient;
