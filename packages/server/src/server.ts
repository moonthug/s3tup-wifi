import * as http from 'http';
import { app } from './app';

let server;

export function startServer() {
  server = http.createServer(app.callback());
  server.listen(3000);
}

export function stopServer() {
  server.close();
}
