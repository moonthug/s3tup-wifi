import { promises as fs } from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';

export async function writeFile(filepath: string, data: unknown): Promise<void> {
  let fileData = data.toString();

  await mkdirp(path.dirname(filepath));
  
  if (typeof data === 'object') {
    fileData = JSON.stringify(data);
  }

  return fs.writeFile(filepath, fileData);
}
