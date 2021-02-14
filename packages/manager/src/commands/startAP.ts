import { exec } from '../helpers/exec';
import { parseOk } from '../helpers/parseOk';

export async function startAP(): Promise<void> {
  parseOk(await exec('systemctl start hostapd'), { title: 'Start hostapd' });
}
