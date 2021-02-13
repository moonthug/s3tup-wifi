import { createAP, scan } from '../src/manager';

async function main() {
  const createAPResult = await createAP({
    ifName: 'wlp2s0',
    ssid: 'my-test-wifi',
  });

  const scanResults = await scan();
}

main().catch(console.error);
