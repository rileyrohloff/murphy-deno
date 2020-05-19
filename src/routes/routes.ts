import { Router } from "https://deno.land/x/oak/mod.ts";
import { spotifyAuth, spotifyAudioAnlz } from "../services/spotify.ts";

const router = new Router()
  .get("/test", (context) => {
    context.response.body = { "data": "hello world" };
  })
  .post("/api/login", async (ctx) => {
    const params = await ctx.params;
    const login = await spotifyAuth(params);
    ctx.response.body = { "data": login };
  })
  .get("/api/audioData", async (ctx) => {
    // const headers = ctx.request.headers;
    const params = ctx.params;
    const response = await spotifyAudioAnlz(params);
    ctx.response.body = { "data": response };
  });
export default router;
