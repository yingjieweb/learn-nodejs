const db = require('./db')

module.exports.show = async () => {
  const taskList = await db.read()
  taskList.map((item, index) => {
    console.log(`${item.isDone ? '[x]' : '[_]'} ${index + 1}: ${item.name}`);
  })
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
