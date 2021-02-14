import { createServer, Server } from 'http';
import { createApp } from './app';

let server: Server;

export interface ServerOptions {
  ifName: string;
  port: number;
}

export function startServer(options: ServerOptions) {
  const app = createApp(options);
  server = createServer(app.callback());
  server.listen(options.port);

  return server;
}

export function stopServer() {
  server.close();
}
