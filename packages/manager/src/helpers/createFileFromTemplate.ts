import { promises as fs } from 'fs';
import * as path from 'path';
import template from 'string-template';
// import { deleteFileIfExists } from './deleteFileIfExists';

export async function createFileFromTemplate(fileName: string, templateName: string, data?: any) {
  // await deleteFileIfExists(fileName);

  const file = await fs.readFile(path.resolve(path.join('..', 'templates', templateName)));
  const output = template(file.toString(), data);

  await fs.writeFile(fileName, output);
}
