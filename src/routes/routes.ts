import { Router } from "https://deno.land/x/oak/mod.ts";
import SessionUser from "../services/userAuth.ts";
import SwapiClient from "../services/swapi.ts";
import { getUrlParams, isAuthed } from "../services/utilities.ts";

export interface LoginParams {
  username?: string;
  password?: string;
}

let loggedInUser: SessionUser;

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
    if (
      loggedInUser.cookies &&
      loggedInUser.cookies === ctx.cookies.get("sessionID")
    ) {
      const dataParam: any = ctx.params.data;

      const res = await SwapiClient.getData(dataParam);
      ctx.response.body = res;
    } else {
      ctx.response.status = 401;
      ctx.response.body = { "error": "authenication failed" };
    }
  })
  .post("/api/login", async (ctx) => {
    let params: LoginParams = getUrlParams(
      ctx.request.url.searchParams.toString(),
    );
    const auth: boolean = await isAuthed(params);
    if (auth) {
      loggedInUser = new SessionUser(
        params.username,
        params.password,
      );

      const session = SessionUser.genCookie();
      loggedInUser.authentication = true;
      loggedInUser.cookies = session;
      ctx.response.status = 200;
      ctx.response.body = { "data": "success" };
      ctx.cookies.set("sessionID", session);
    } else {
      ctx.response.status = 401;
      ctx.response.body = { "error": "authenication failed" };
    }
  });

export default router;
