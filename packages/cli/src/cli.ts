import { Command } from 'commander';
import { start } from './commands/start';

const program = new Command();

program
  .command('start')
  .arguments('<ssid> <ifName>')
  .description('Start wifi-s3tup', {
    ssid: 'SSID to create',
    ifName: 'Interface name to create the AP on'
  })
  .action(start);

program.parse(process.argv);
