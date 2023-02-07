const db = require('./db')
const inquirer = require('inquirer')

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
    }), {name: '创建任务', value: '-1'}, {name: '退出', value: '-2'}],
  }).then((answer) => {
    const resultIndex = parseInt(answer.index)
    if (resultIndex >= 0) {
      // 请选择操作
    } else if (resultIndex === -1) {
      // 船舰任务
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
