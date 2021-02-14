import { ExecResult } from './exec';

export function parseOk(execResult: ExecResult, throwError = true): boolean {
  if (execResult.error) {
    if (throwError) {
      throw new Error(execResult.stdErr);
    } else {
      return false;
    }
  }
  return true;
}
