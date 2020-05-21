import { Router } from "https://deno.land/x/oak/mod.ts";
import SessionUser from "../services/userAuth.ts";
import SwapiClient from "../services/swapi.ts";
import { getUrlParams } from "../services/utilities.ts";

export interface LoginParams {
  username?: string;
  password?: string;
}

const router: Router = new Router();

router
  .get("/test", (context) => {
    context.response.body = { "data": "hello world" };
  })
  .get("/api/shipData", async (ctx) => {
    const response = await SwapiClient.shipSpeeds();
    ctx.response.body = response;
  })
  .get("/api/:data", async (ctx) => {
    const dataParam: any = ctx.params.data;
    const res = await SwapiClient.getData(dataParam);
    ctx.response.body = res;
  })
  .post("/api/login", async (ctx) => {
    let params: object = getUrlParams(
      ctx.request.url.searchParams.toString(),
    );
    console.log(params);
    ctx.response.body = { "data": [params] };
  });

export default router;
