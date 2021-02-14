import { exec } from '../helpers/exec';
import { parseOk } from '../helpers/parseOk';

export async function stopAP(): Promise<void> {
  parseOk(await exec('systemctl stop hostapd'), { title: 'Stop hostapd' });
}
