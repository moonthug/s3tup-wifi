import { createAP } from '@wifi-s3tup/manager';
import { startServer, stopServer } from '@wifi-s3tup/server';
// import { logger } from '../utils/logger';
import { promises as fs } from 'fs';
import { CONFIG_FILE_PATH } from '../constants/defaults';

export interface InitOptions {
  port?: number;
}

export async function init(ssid: string, ifName: string, options: InitOptions) {
  options = {
    port: 3000,
    ...options
  };

  // Check if config file exists
  // if(await fs.exists(CONFIG_FILE_PATH)) {
  //   throw new Error(`wifi-s3tup already initialised!`);
  // }

  // logger.info('Creating Wifi AP...');
  const createAPResult = await createAP({
    ssid, ifName
  });

  // logger.info('Starting Webserver..');
  startServer({ ifName, port: options.port });

  process.on('beforeExit', () => {
    stopServer();
  });
}
