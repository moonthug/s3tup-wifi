import { homedir } from 'os';
import path from 'path';

export const CONFIG_BASE_PATH = path.join(homedir(), '.wifi-s3tup');
export const CONFIG_FILE_PATH = path.join(homedir(), '.wifi-s3tup', 'config.json');
