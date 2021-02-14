import { createAP, scan } from '../src';

async function main() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createAPResult = await createAP({
    ifName: 'wlp2s0',
    ssid: 'my-test-wifi',
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scanResults = await scan({ ifName: 'wlp2s0' });
}

main().catch(console.error);
