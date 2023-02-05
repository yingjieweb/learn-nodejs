const db = require('./db')

module.exports.add = async (taskName) => {
  const taskList = await db.read()
  taskList.push({
    name: taskName,
    isDone: false
  })
  await db.write(taskList)
}