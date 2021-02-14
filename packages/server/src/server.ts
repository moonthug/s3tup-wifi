import { createServer, Server } from 'http';
import { app } from './app';

let server: Server;

export function startServer() {
  server = createServer(app.callback());
  server.listen(3000);
  return server;
}

export function stopServer() {
  server.close();
}
