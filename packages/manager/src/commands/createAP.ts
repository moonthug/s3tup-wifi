import { exec, ExecResult } from '../helpers/exec';
import { parseOk } from '../helpers/parseOk';

const CON_NAME='wifi-s3tup-hotspot';
const CON_ADD_REGEXP = /'([^\.]+)' \(([^\.]+)\)/g;


export interface CreateAPOptions {
  conName?: string;
  ifName: string;
  ssid: string;
}

export interface CreateAPResult {
  connectionName: string;
  connectionUUID: string;
}


function parseConnAdd(result: ExecResult) {
  if (result.error === true) {
    throw new Error(result.stdErr);
  }

  const [
    all,
    connectionName,
    connectionUUID
  ] = CON_ADD_REGEXP.exec(result.stdOut);

  return { connectionName, connectionUUID };
}

export async function createAP(options: CreateAPOptions): Promise<CreateAPResult> {
  /**
   * sudo nmcli con add type wifi ifname wlp2s0 con-name 'wifi-s3tup-hotspot' autoconnect yes ssid 'test-wifi'
     sudo nmcli con modify 'wifi-s3tup-hotspot' 802-11-wireless.mode ap 802-11-wireless.band bg ipv4.method shared
     sudo nmcli --terse con up 'wifi-s3tup-hotspot'
   */

  const commandOptions: CreateAPOptions = {
    conName: CON_NAME,
    ...options
  };

  const parseConnAddResult = parseConnAdd(await exec([
    'nmcli',
    'con add',
    'type wifi',
    `ifname ${commandOptions.ifName}`,
    `con-name '${commandOptions.conName}'`,
    'autoconnect yes',
    `ssid ${commandOptions.ssid}`
  ]));

  const bandSetupResult = parseOk(await exec([
    'nmcli',
    'con modify',
    `'${parseConnAddResult.connectionUUID}'`,
    '802-11-wireless.mode ap',
    '802-11-wireless.band bg',
    'ipv4.method shared'
  ]));

  const connectionStartResult = parseOk(await exec([
    'nmcli',
    'con up',
    `'${parseConnAddResult.connectionUUID}'`
  ]));

  return parseConnAddResult;
}
