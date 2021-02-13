import Koa from 'koa';
import Router from '@koa/router';

import { scan } from '@wifi-s3tup/manager';

export const app = new Koa();

const router = new Router();
router.get('/scan', async ctx => {
  const scanResults = scan;
  ctx.body = scanResults;
})

app.use(router.routes());
