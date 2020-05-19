import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./src/routes/routes.ts";
import { PORT } from "./config.ts";

const app = new Application();

app.addEventListener("error", (evt) => {
  // Will log the thrown error to the console.
  console.log(evt.error);
});
app.use(router.routes());
app.use(router.allowedMethods());

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

await app.listen({ port: PORT });
