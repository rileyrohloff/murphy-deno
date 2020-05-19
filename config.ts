import { config } from "https://deno.land/x/dotenv/mod.ts";

config({
  export: true,
});

export const PORT = Deno.env.get('PORT') || 8080;
export const clientId = Deno.env.get("CLIENT_ID");
export const secret = Deno.env.get("CLIENT_SECRET");
