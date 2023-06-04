const {exec, ExecOptions} = require('shelljs');

module.exports = async function(command) {
  console.log('execAsync', { command });
  const _options = {};
  return new Promise((resolve, reject) => {
    exec(command, _options, (code, stdout, stderr) => {
      if (code !== 0) {
        const err = new Error();
        err.message = stderr;
        err.name = String(code);
        reject(err);
      } else {
        resolve(stdout);
      }
    });
  })  
}