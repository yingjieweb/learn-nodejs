const db = require('./db')
const inquirer = require('inquirer')

module.exports.show = async () => {
  const taskList = await db.read()
  console.log('taskList', taskList);
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
      }).then(answer2 => {
        console.log(answer2.action);
        switch (answer2.action) {
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
            }).then(answer3 => {
              console.log(answer3);
              taskList[taskIndex].name = answer3.name
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
    } else if (taskIndex === -1) {
      inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'Please input task name',
        default: taskList[taskIndex].name
      }).then(answer4 => {
        taskList.push({name: answer4.name, isDone: false})
        db.write(taskList)
      })
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
