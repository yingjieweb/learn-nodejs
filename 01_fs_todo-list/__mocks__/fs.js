const fs = jest.createMockFromModule('fs');
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}
const setReadMock = (path, error, data) => {
  readMocks[path] = [error, data]
}
const readFile = (path, options, callback) => {
  if (callback === undefined) {
    callback = options
  }
  if (path in readMocks) {
    callback(...readMocks[path])
  } else {
    _fs.readFile(path, options, callback)
  }
}

let writeMocks = {}
const setWriteMock = (path, fn) => {
  writeMocks[path] = fn
}
const writeFile = (path, data, options, callback) => {
  if (path in writeMocks) {
    writeMocks[path](path, data, options, callback)
  } else {
    _fs.writeFile(path, data, options, callback)
  }
}

const clearMocks = () => {
  readMocks = {}
  writeMocks = {}
}

fs.setReadMock = setReadMock
fs.readFile = readFile
fs.setWriteMock = setWriteMock
fs.writeFile = writeFile
fs.clearMocks = clearMocks

module.exports = fs;