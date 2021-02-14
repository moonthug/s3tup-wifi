import { createAP } from '@wifi-s3tup/manager';
import { startServer, stopServer } from '@wifi-s3tup/server';
import { logger } from '../utils/logger';
import { promises as fs } from 'fs';
import { CONFIG_FILE_PATH } from '../constants/defaults';


export async function init(ssid: string, ifName: string) {
  // Check if config file exists
  if(await fs.exists(CONFIG_FILE_PATH)) {
    throw new Error(`wifi-s3tup already initialised!`);
  }

  logger.info('Creating Wifi AP...');
  const createAPResult = await createAP({
    ssid, ifName
  });
  if ()

  logger.info('Starting Webserver..');
  startServer();

  process.on('beforeExit', () => {
    stopServer();
  });
}
