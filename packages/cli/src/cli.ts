import { Command } from 'commander';
import { init } from './commands/init';

const program = new Command();

program
  .command('init')
  .arguments('<ssid> <ifName> [port]')
  .description('Initialise wifi-s3tup', {
    ssid: 'SSID to create',
    ifName: 'Interface name to create the AP on',
    port: 'Port to run the webserver on (default: 3000)'
  })
  .action(init);

program.parse(process.argv);
