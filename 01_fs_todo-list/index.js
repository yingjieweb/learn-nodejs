const db = require('./db')
const inquirer = require('inquirer')


function askForAction(taskList, taskIndex) {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Please select the operation for task',
    choices: [
      {name: 'Mark as done', value: 'markAsDone'},
      {name: 'Mark as undone', value: 'markAsUndone'},
      {name: 'Change task name', value: 'updateTaskName'},
      {name: 'Remove task', value: 'remove'},
      {name: 'Quit', value: 'quit'}
    ]
  }).then(answer => {
    switch (answer.action) {
      case 'markAsDone':
        taskList[taskIndex].isDone = true
        db.write(taskList)
        break;
      case 'markAsUndone':
        taskList[taskIndex].isDone = false
        db.write(taskList)
        break;
      case 'updateTaskName':
        inquirer.prompt({
          type: 'input',
          name: 'name',
          message: 'Please input new task name',
          default: taskList[taskIndex].name
        }).then(answer1 => {
          taskList[taskIndex].name = answer1.name
          db.write(taskList)
        })
        break;
      case 'remove':
        const remainedTask = taskList.filter((_, index) => index !== taskIndex)
        db.write(remainedTask)
        break;
      default:
        break;
    }
  })
}
function askForCreateTask(taskList) {
  inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Please input task name'
  }).then(answer => {
    taskList.push({name: answer.name, isDone: false})
    db.write(taskList)
  })
}

module.exports.show = async () => {
  const taskList = await db.read()
  inquirer.prompt({
    type: 'list',
    name: 'index',
    message: 'Please select the task which you want to operate?',
    choices: [...taskList.map((item, index) => {
      return {
        name: `${item.isDone ? '[x]' : '[_]'} ${index + 1}: ${item.name}`,
        value: index.toString()
      }
    }), {name: 'Create new task', value: '-1'}, {name: 'Quit', value: '-2'}],
  }).then((answer) => {
    const taskIndex = parseInt(answer.index)
    if (taskIndex >= 0) {
      askForAction(taskList, taskIndex)
    } else if (taskIndex === -1) {
      askForCreateTask(taskList)
    }
  });
}

module.exports.add = async (taskName) => {
  const taskList = await db.read()
  taskList.push({
    name: taskName,
    isDone: false
  })
  await db.write(taskList)
}

module.exports.clear = async () => {
  await db.write([])
}
