## 📝 fs_todo-list

### 💡 How to create a CLI project like this?
- Run `npm/yarn init -y` to create `package.json` in your project
- Run `npm/yarn install/add commander` install commander dependency
- Check this link: https://github.com/tj/commander.js and get some inspiration
- Run `npm/yarn install/add inquirer` to activate your CLI
- Add `bin` and `files` property in `package.json` when you finish your project
- Add shebang `#!/usr/bin/env node` and run `chmod -x cli.js` before publishing CLI
- Run `nrm use npm` -> `npm adduser` -> sign in -> `npm publish` to publish your CLI 🎉

### 🤔 How to test your CLI?
- Run `npm/yarn install/add jest --dev` to install jest dependency
- Make `__test__` dir in your project and create xxx.spec.js
- Add jest's execute test scripts in `package.json`
- Mock node.js modules need to add `__mocks__` dir and xxx.js
- If you wanna debug, run `node --inspect-brk cli.js`
- Clear the test cache when you finish the current spec test