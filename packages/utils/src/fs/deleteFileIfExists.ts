import { promises as fs } from 'fs';
import { exists } from './exists';

export async function deleteFileIfExists(filepath: string): Promise<boolean> {
  const fileExists = exists(filepath);

  if (!fileExists) return false;

  await fs.rm(filepath);

  return true;
}
