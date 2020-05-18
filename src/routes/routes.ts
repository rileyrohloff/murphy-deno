import { Router } from 'https://deno.land/x/oak/mod.ts';

const router = new Router()

.get('/test', (context) => {
    context.response.body = {'data': 'hello world'}
})


export default router;