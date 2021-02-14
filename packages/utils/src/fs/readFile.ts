import { promises as fs } from 'fs';

export async function readFile(filepath: string): Promise<string> {
  return (await fs.readFile(filepath)).toString();
}
