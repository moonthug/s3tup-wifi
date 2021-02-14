import * as path from 'path';
import template from 'string-template';
import { fs } from '@wifi-s3tup/utils';

export async function createFileFromTemplate(fileName: string, templateName: string, data?: any) {
  await fs.deleteFileIfExists(fileName);

  const file = await fs.readFile(path.resolve(__dirname, path.join('..', 'templates', templateName)));
  const output = template(file.toString(), data);

  await fs.writeFile(fileName, output);
}
