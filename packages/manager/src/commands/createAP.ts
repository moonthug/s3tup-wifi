import { exec } from '../helpers/exec';
import { parseOk } from '../helpers/parseOk';
import { createFileFromTemplate } from '../helpers/createFileFromTemplate';
import { startAP } from './startAP';

export type HWMode = 'a' | 'g';

export interface CreateAPOptions {
  ifName: string;
  hwMode?: HWMode;
  channel?: number;
  reboot?: boolean;
  ssid: string;
}

export interface CreateAPResult {
  ifName: string;
  hwMode: HWMode;
  channel: number;
  ssid: string;
}

/**
 *
 * @param options
 */
export async function createAP(options: CreateAPOptions): Promise<CreateAPResult> {
  const commandOptions: CreateAPOptions = {
    channel: 6,
    hwMode: 'g',
    reboot: true,
    ...options
  };

  await createFileFromTemplate(
    '/etc/hostapd/hostapd.conf',
    'hostapd_conf',
    {
      channel: commandOptions.channel,
      ifName: commandOptions.ifName,
      hwMode: commandOptions.hwMode,
      ssid: commandOptions.ssid
    }
  );

  await createFileFromTemplate(
    '/etc/default/hostapd',
    'hostapd_default'
  );

  await createFileFromTemplate(
    '/etc/dnsmasq.conf',
    'dnsmasq_conf',
    { ifName: commandOptions.ifName }
  );

  parseOk(await exec('systemctl unmask hostapd'), { title: 'Unmask hostapd' });
  parseOk(await exec('systemctl enable hostapd'), { title: 'Enable hostapd' });

  await startAP();

  // if (commandOptions.reboot === true) {
  //   await exec('reboot');
  // }

  return commandOptions as CreateAPResult;
}
