import { promises as fs } from 'fs';

export async function readJSONFile<T>(filepath: string): Promise<T> {
  return JSON.parse((await fs.readFile(filepath)).toString()) as T;
}
