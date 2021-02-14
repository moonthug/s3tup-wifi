import { ExecResult } from './exec';

export interface ParseOkOptions {
  title?: string;
  throwError?: boolean;
}

export function parseOk(execResult: ExecResult, options?: ParseOkOptions): boolean {
  options = {
    throwError: true,
    title: 'stdError',
    ...options
  };

  if (execResult.error) {
    if (options.throwError) {
      throw new Error(`${options.title}\n${execResult.stdErr}`);
    } else {
      return false;
    }
  }
  return true;
}
