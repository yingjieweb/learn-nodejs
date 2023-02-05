const fs = require('fs')
const path = require('path')

const homedir = require('os').homedir()
const home = process.env.home || homedir
const dbPath = path.join(home, '.todo')

const db = {
  read(path = dbPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, {flag: 'a+'}, (error, data) => {
        if (error) return reject(error)
        let taskList
        try {
          taskList = JSON.parse(data.toString())
        } catch (err2) {
          taskList = []
        }
        resolve(taskList)
      })
    })
  },
  write(taskList, path = dbPath) {
    return new Promise((resolve, reject) => {
      const taskListString = JSON.stringify(taskList)
      fs.writeFile(path, taskListString, (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

module.exports = db