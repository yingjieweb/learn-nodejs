const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  it('can read', async () => {
    const testData = [{name: 'taskName', isDone: false}]
    fs.setReadMock('/testReadPath', null, JSON.stringify(testData))
    const list = await db.read('/testReadPath')
    expect(list).toStrictEqual(testData)
  });
  it('can write ', async () => {
    let fakeFile
    fs.setWriteMock('/testWritePath', (path, data, callback) => {
      fakeFile = data
      callback(null)
    })
    const list = [{name: 'task1', isDone: false}]
    await db.write(list, '/testWritePath')
    expect(fakeFile).toBe(JSON.stringify(list))
  });
});
