import { exec as nodeExec, ExecException } from 'child_process';

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
    nodeExec(commandValue, (err: ExecException | null, stdOut: string, stdErr: string) => {
      if (err) {
        return reject(err);
      }

      if (stdErr) {
        return resolve({ stdErr, error: true });
      }

      resolve({ stdOut, error: false });
    });
  });
}
