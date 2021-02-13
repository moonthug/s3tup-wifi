import { createAP } from '@wifi-s3tup/manager';
import { startServer, stopServer } from '@wifi-s3tup/server';
import { logger } from '../utils/logger';

export async function start(ssid: string, ifName: string) {

  logger.info('Creating Wifi AP...');
  const createAPResult = await createAP({
    ssid, ifName
  });

  logger.info('Starting Webserver..');
  startServer();

  process.on('beforeExit', () => {
    stopServer();
  });
}
