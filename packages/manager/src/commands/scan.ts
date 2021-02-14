import { ExecResult, exec } from '../helpers/exec';

export interface ScanOptions {
  ifName: string;
}

export interface ScanResult {
  address: string;
  channel: number;
  frequency: number;
  mode: string;
  quality: number;
  signal: number;
  noise: number;
  security: string;
  ssid: string;
}

const BSSID_REGEXP = /[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}\\:[A-F0-9]{2}/g;

function parse(result: ExecResult): ScanResult[] {
  if (result.error === false) {
    return result.stdOut
      .split(/Cell [0-9]+ -/)
      .map(cell => {
        const parsed: ScanResult = {} as ScanResult;
        let match;

        if ((match = cell.match(/Address\s*[:|=]\s*([A-Fa-f0-9:]{17})/))) {
          parsed.address = match[1].toLowerCase();
        }

        if ((match = cell.match(/Channel\s*([0-9]+)/))) {
          parsed.channel = parseInt(match[1], 10);
        }

        if ((match = cell.match(/Frequency\s*[:|=]\s*([0-9\.]+)\s*GHz/))) {
          parsed.frequency = parseFloat(match[1]);
        }

        if ((match = cell.match(/Mode\s*[:|=]\s*([^\s]+)/))) {
          parsed.mode = match[1].toLowerCase();
        }

        if ((match = cell.match(/Quality\s*[:|=]\s*([0-9]+)/))) {
          parsed.quality = parseInt(match[1], 10);
        }

        if ((match = cell.match(/Signal level\s*[:|=]\s*(-?[0-9]+)/))) {
          parsed.signal = parseInt(match[1], 10);
        }

        if ((match = cell.match(/Noise level\s*[:|=]\s*(-?[0-9]+)/))) {
          parsed.noise = parseInt(match[1], 10);
        }

        if ((match = cell.match(/ESSID\s*[:|=]\s*"([^"]+)"/))) {
          parsed.ssid = match[1];
        }

        if ((match = cell.match(/WPA2\s+Version/))) {
          parsed.security = 'wpa2';
        }
        else if ((match = cell.match(/WPA\s+Version/))) {
          parsed.security = 'wpa';
        }
        else if ((match = cell.match(/Encryption key\s*[:|=]\s*on/))) {
          parsed.security = 'wep';
        }
        else if ((match = cell.match(/Encryption key\s*[:|=]\s*off/))) {
          parsed.security = 'open';
        }

        return parsed;
      })
      .filter(cell => cell.address !== undefined)
      .sort((cellA, cellB) => {
        return cellB.signal - cellA.signal;
      });
  }

  return undefined;
}

export async function scan(scanOptions: ScanOptions): Promise<ScanResult[]> {
  return parse(
    await exec([
      'iwlist',
      scanOptions.ifName,
      'scan'
    ])
  );
}
