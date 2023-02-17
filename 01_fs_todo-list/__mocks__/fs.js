const fs = jest.createMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}

const setMock = (path, error, data) => {
  mocks[path] = [error, data]
}
const readFile = (path, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
  if (path in mocks) {
    callback(...mocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

fs.setMock = setMock
fs.readFile = readFile

module.exports = fs;