import { Router } from "https://deno.land/x/oak/mod.ts";
import SessionUser from "../services/userAuth.ts";
import SwapiClient from "../services/swapi.ts";
import { getUrlParams, isAuthed } from "../services/utilities.ts";
import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../services/database.ts";

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
  .get("/api/users", async (ctx) => {
    const users = await getAllUsers();

    ctx.response.body = { "data": users };
  })
  .get("/api/user/:id", async (ctx) => {
    if (ctx.params.id && ctx.params.id.length > 3) {
      const uid = ctx.params.id;
      console.log(uid);
      const getUserCall = await getUser(uid);
      if (getUserCall.id) {
        ctx.response.body = { "data": getUserCall };
        ctx.response.status = 200;
      } else {
        ctx.response.body = { "data": `user ${uid} not found` };
        ctx.response.status = 404;
      }
    } else {
      ctx.response.body = { "error": "please provide a valid userid" };
      ctx.response.status = 422;
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
  })
  .post("/api/user", async (ctx) => {
    if (ctx.request.hasBody) {
      const data = await ctx.request.body();
      if (data.value.username && data.value.password) {
        const postUser = await createUser(data.value);
        ctx.response.body = { "data": postUser };
      } else {
        ctx.response.body = { "error": "not valid body" };
      }
    } else {
      console.log("no body");
    }
  })
  .put("/api/user/:id", async (ctx) => {
    if (ctx.params.id && ctx.request.hasBody) {
      const userid: any = await ctx.params;
      const userData = await ctx.request.body();

      const updateCall = await updateUser(userid.id, userData.value);
      if (updateCall) {
        ctx.response.body = { "data": updateCall };
        ctx.response.status = 200;
      } else {
        ctx.response.body = { "data": `user ${userid} not found` };
        ctx.response.status = 404;
      }
    } else {
      ctx.response.body = { "error": "please provide a valid userid" };
      ctx.response.status = 422;
    }
  })
  .delete("/api/user/:id", async (ctx) => {
    if (ctx.params.id && ctx.params.id.length > 3) {
      const uid = ctx.params;
      const deleteCall = await deleteUser(uid);
      if (deleteCall) {
        ctx.response.body = { "data": "success" };
        ctx.response.status = 200;
      } else {
        ctx.response.body = { "data": `user ${uid.id} not found` };
        ctx.response.status = 404;
      }
    } else {
      ctx.response.body = { "error": "please provide a valid userid" };
      ctx.response.status = 422;
    }
  });

export default router;
