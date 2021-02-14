import { exec, ExecResult } from '../helpers/exec';
import { parseOk } from '../helpers/parseOk';
import { createFileFromTemplate } from '../helpers/createFileFromTemplate';

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

  /**
   * nano /etc/hostapd/hostapd.conf
   */
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

  /**
   * nano /etc/hostapd/default
   */
  await createFileFromTemplate(
    '/etc/default/hostapd',
    'hostapd_default'
  );

  /**
   * nano /etc/dnsmasq.conf
   */
  await createFileFromTemplate(
    '/etc/dnsmasq.conf',
    'dnsmasq_conf'
  );

  if (commandOptions.reboot === true) {
    await exec('reboot');
  }

  return commandOptions as CreateAPResult;
}
