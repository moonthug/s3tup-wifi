import Koa from 'koa';
import Router from '@koa/router';
import logger from 'koa-logger';
import { scan } from '@wifi-s3tup/manager';

export interface AppOptions {
  ifName: string;
}

export function createApp(options: AppOptions): Koa {
  const app = new Koa();

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
    ctx.body = await scan({ ifName: options.ifName });
  });

  app.use(router.routes());
  app.use(router.allowedMethods());

  return app;
}
