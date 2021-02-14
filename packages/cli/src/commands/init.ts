import { createAP } from '@wifi-s3tup/manager';
import { startServer, stopServer } from '@wifi-s3tup/server';
import { fs, logger } from '@wifi-s3tup/utils';
import { CONFIG_FILE_PATH } from '../constants/defaults';

export interface InitOptions {
  port?: number;
}

export async function init(ssid: string, ifName: string, options: InitOptions): Promise<void> {
  options = {
    port: 3000,
    ...options
  };

  // Check if config file exists
  if (await fs.exists(CONFIG_FILE_PATH)) {
    logger.error(`${ CONFIG_FILE_PATH } file exists. Cannot initialise wifi-s3tup`);
    throw new Error('wifi-s3tup already initialised!');
  }

  logger.info(`Writing config file ${CONFIG_FILE_PATH}...`);
  await fs.writeFile(CONFIG_FILE_PATH, {
    ssid,
    ifName,
    port: options.port
  });

  logger.info('Creating Wifi AP...');
  const createAPResult = await createAP({
    ssid, ifName
  });

  logger.info('Starting Webserver..');
  startServer({ ifName, port: options.port });

  process.on('beforeExit', () => {
    stopServer();
  });
}
