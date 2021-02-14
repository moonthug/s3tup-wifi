import { promises as fs } from 'fs';

export async function writeFile(filepath: string, data: unknown): Promise<void> {
  let fileData = data.toString();
  
  if (typeof data === 'object') {
    fileData = JSON.stringify(data);
  }

  return fs.writeFile(filepath, fileData);
}
