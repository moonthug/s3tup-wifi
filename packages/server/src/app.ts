import Koa from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger'
import { scan } from '@wifi-s3tup/manager';

export const app = new Koa();

app.use(logger());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
    ctx.app.emit('error', err, ctx);
  }
});

const router = new Router();

router.get('/scan', async ctx => {
  const scanResults = await scan();
  ctx.body = scanResults;
})

app.use(router.routes());
app.use(router.allowedMethods());
