import { LoginParams } from "../routes/routes.ts";

export const getUrlParams = (params: string): object => {
  const paramsObj: LoginParams | any = {};
  const urlParams: URLSearchParams = new URLSearchParams(params);
  const entries = urlParams.entries();
  for (let entry of entries) {
    paramsObj[entry[0]] = entry[1];
  }
  return paramsObj;
};

export const isAuthed = async (params: LoginParams): Promise<boolean> => {
  let auth: boolean;
  const { username, password } = params;
  if (
    username === Deno.env.get("MY_USERNAME") &&
    password === Deno.env.get("MY_PASSWORD")
  ) {
    auth = true;
  } else {
    auth = false;
  }
  return Promise.resolve(auth);
};
