import { startServer, stopServer } from '@wifi-s3tup/server';
import { fs, logger } from '@wifi-s3tup/utils';
import { CONFIG_FILE_PATH } from '../constants/defaults';
import { Config } from '@wifi-s3tup/cli';

export async function start(): Promise<void> {
  // Check if config file exists
  if (!await fs.exists(CONFIG_FILE_PATH)) {
    logger.error(`${ CONFIG_FILE_PATH } file doesnt exist. Cannot start wifi-s3tup`);
    throw new Error('wifi-s3tup hasnt been initialised!');
  }

  const config = await fs.readJSONFile<Config>(CONFIG_FILE_PATH);

  logger.info('Starting Webserver...');
  startServer({ ifName: config.ifName, port: config.port });

  process.on('beforeExit', () => {
    stopServer();
  });
}
