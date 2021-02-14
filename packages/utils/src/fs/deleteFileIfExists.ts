import { promises as fs } from 'fs';
import { exists } from './exists';

export async function deleteFileIfExists(filepath: string): Promise<boolean> {
  if (await exists(filepath)) {
    await fs.unlink(filepath);
    return true;
  }

  return false;
}
