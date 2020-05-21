import { LoginParams } from "../routes/routes.ts";

export const getUrlParams = (params: string): object => {
  const paramsObj: LoginParams | any = {};
  const urlParams = new URLSearchParams(params);
  const entries = urlParams.entries();
  for (let entry of entries) {
    paramsObj[entry[0]] = entry[1];
  }
  return paramsObj;
};
