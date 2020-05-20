import { Router } from "https://deno.land/x/oak/mod.ts";
// import { spotifyAuth, spotifyAudioAnlz } from "../services/spotify.ts";
import SwapiClient from "../services/swapi.ts";

interface DataShape {
  data?: Array<any>;
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
    let res: DataShape;
    res = await SwapiClient.getData(dataParam);
    ctx.response.body = res;
  });

export default router;
