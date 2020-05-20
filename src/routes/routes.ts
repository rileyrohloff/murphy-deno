import { Router } from "https://deno.land/x/oak/mod.ts";
// import { spotifyAuth, spotifyAudioAnlz } from "../services/spotify.ts";
import SwapiClient from "../services/swapi.ts";

const router: Router = new Router()
  .get("/test", (context) => {
    context.response.body = { "data": "hello world" };
  })
  .get("/api/shipData", async (ctx) => {
    const response = await SwapiClient.shipSpeeds("https://swapi.dev/api");
    ctx.response.body = response;
  });

export default router;
