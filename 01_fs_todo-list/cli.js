#!/usr/bin/env node
const program = require('commander')
const api = require('./index')
const pkg = require('./package.json')

program.version(pkg.version)
program
  .command('ls')
  .description('show all tasks')
  .action(() => {
    api.show()
  })

program
  .command('add <source> [destination]')
  .description('add a new task')
  .action((...args) => {
    const newTaskName = args.slice(0, -2).join(' ')
    api.add(newTaskName).then(() => {
      console.log('Adding task succeeded.')
    }).catch(() => {
      console.log('Adding task failed.')
    })
  })

program
  .command('clear')
  .description('clear all tasks')
  .action(() => {
    api.clear().then(() => {
      console.log('Clearing task succeeded.')
    }).catch(() => {
      console.log('Clearing task failed.')
    })
  })

program.parse(process.argv)
