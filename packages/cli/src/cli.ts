import { Command } from 'commander';
import { init, start } from './commands';

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

program
  .command('start')
  .description('Start wifi-s3tup')
  .action(start);

program.parse(process.argv);
