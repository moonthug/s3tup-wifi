import { promises as fs } from 'fs';

export async function exists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath);
    return true;
  } catch (e) {
    return false;
  }
}
