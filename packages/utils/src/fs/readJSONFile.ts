import { readFile } from './readFile';

export async function readJSONFile<T>(filepath: string): Promise<T> {
  return JSON.parse((await readFile(filepath))) as T;
}
