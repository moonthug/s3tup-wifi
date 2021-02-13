import { createServer, Http2Server } from 'http2';
import { app } from './app';

let server: Http2Server;

export function startServer() {
  server = createServer(app.callback());
  server.listen(3000);
  return server;
}

export function stopServer() {
  server.close();
}
