const db = require('../db.js')
const fs = require('fs')
jest.mock('fs')

describe('db', () => {
  it('can read', async () => {
    const testData = [{name: 'taskName', isDone: false}]
    fs.setMock('/testPath', null, JSON.stringify(testData))
    const list = await db.read('/testPath')
    expect(list).toStrictEqual(testData)
  });
  it('can write ', () => {
    expect(db.write instanceof Function).toBe(true)
  });
});
