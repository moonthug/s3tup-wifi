import { exec, ExecResult } from '../helpers/exec';

export interface ScanResult {
  ssid: string;
  bssid: string;
  mode: string;
  channel: number;
  frequency: number;
  // signal_level: dBFromPercentage(quality),
  quality: number;
  security: string;
  security_flags: {
    wpa: string,
    rsn: string
  }
}

const BSSID_REGEXP = /[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}/g

function parse(result: ExecResult): ScanResult[] {
  if (result.error === false) {
    // Taken from https://github.com/friedrith/node-wifi
    return result.stdOut
      .split('\n')
      .filter(line => line !== '' && line.includes(':'))
      .map(line => {
        const match = line.match(BSSID_REGEXP);
        const bssid = match[0].replace(/\\:/g, ':');

        const fields = line.replace(match[0], '').split(':');

        const [
          active,
          ssid,
          bssidAlreadyProcessed,
          mode,
          channel,
          frequency,
          quality,
          security,
          security_flags_wpa,
          security_flags_rsn
        ] = fields;

        return {
          ssid,
          bssid,
          mode,
          channel: parseInt(channel),
          frequency: parseInt(frequency),
          // signal_level: dBFromPercentage(quality),
          quality: parseInt(quality),
          security: security !== '(none)' ? security : 'none',
          security_flags: {
            wpa: security_flags_wpa,
            rsn: security_flags_rsn
          }
        };
      })
  }

  return undefined;
}

export async function scan(): Promise<ScanResult[]> {
  return parse(await exec([
    'nmcli',
    '--terse',
    '--fields=active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags',
    'device',
    'wifi',
    'list',
    ])
  );
}
