import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import router from './routes/routes.ts';
import { PORT } from './config.ts';

const app = new Application();

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

// Hello World!
// app.use((ctx) => {
//   ctx.response.body = {'data': 'hello world'}
// });

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: PORT });