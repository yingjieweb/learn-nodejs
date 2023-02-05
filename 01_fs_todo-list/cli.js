const program = require('commander')
const api = require('./index')

program
  .option('-d, --debug', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza')

program
  .command('add <source> [destination]')
  .description('add a new task')
  .action((...args) => {
    const newTaskName = args.slice(0, -2).join(' ')
    api.add(newTaskName)
  })

program
  .command('clear')
  .description('clear all tasks')
  .action((...args) => {
    console.log('clear all tasks')
  })

program.parse(process.argv)

console.log(program.xxx)