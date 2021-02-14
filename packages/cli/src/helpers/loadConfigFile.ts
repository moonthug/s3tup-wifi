import { promises as fs } from 'fs';

const CONFIG_BASE_PATH = '~/.wifi-s3tup';

async function createDirectoryIfNotExist() {

}

export async function loadConfigFile() {
  createDirectoryIfNotExist(CONFIG_BASE_PATH);
}
