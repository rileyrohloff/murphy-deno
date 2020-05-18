import "https://deno.land/x/dotenv/load.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";


console.log(config({
    export: true
}));


export const PORT: number = 8080 || Deno.env.get('PORT');
