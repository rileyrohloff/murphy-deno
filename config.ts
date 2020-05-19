import { config } from "https://deno.land/x/dotenv/mod.ts";

config({
  export: true,
});

export const PORT = 8080 || Deno.env.get("PORT");
export const clientId = Deno.env.get("CLIENT_ID");
export const secret = Deno.env.get("CLIENT_SECRET");
