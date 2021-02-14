import { constants, promises as fs } from 'fs';

export async function exists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath, constants.F_OK);
    return true;
  } catch (e) {
    return false;
  }
}
