import { ExecException, exec as nodeExec } from 'child_process';
import { logger } from '@wifi-s3tup/utils';

export interface ExecResult {
  stdErr?: string;
  stdOut?: string;
  error: boolean;
}

export async function exec(command: string | string[]): Promise<ExecResult> {
  const commandValue = Array.isArray(command)
    ? command.join(' ')
    : command;

  return new Promise((resolve, reject) => {
    logger.debug(`execute command\n${commandValue}`);
    nodeExec(commandValue, (err: ExecException | null, stdOut: string, stdErr: string) => {
      if (err) {
        logger.error(`execute command failed:\n${commandValue}\n${err.toString()}`);
        return reject(err);
      }

      logger.debug(`wrote to stdOut:\n${stdOut}`);
      logger.debug(`wrote to stdErr:\n${stdErr}`);
      resolve({ stdOut, stdErr, error: false });
    });
  });
}
