import { Command } from 'commander';
import { start } from './commands/start';

const program = new Command();

program
  .command('start')
  .arguments('<username> [password]')
  .description('Start wifi-s3tup', {
    username: 'user to login',
    password: 'password for user, if required'
  })
  .action(start);

program.parse(process.argv);
