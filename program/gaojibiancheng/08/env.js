// export NODE_ENV=development;  mac环境下配置环境变量
// var exec = require('child_process').exec
// exec('cat *.js | wc -l', function (err, stdout, stderr) {
//   if (err) {
//     console.log('child process exited with error', err.code)
//     return
//   }
//   console.log('only exec')
//   console.log(stdout)
// })

// var env = process.env
// var varName = {}
// var envCopy = {}
// exec = require('child_process').exec
// for (varName in env) {
//   envCopy[varName] = env[varName]
// }
// console.log(env)
// envCopy['CUSTOM ENV VAR'] = 'some value';
// envCopy['CUSTOM ENV VAR 2'] = 'some other value';

// exec('ls -la', {env: envCopy}, function (err, stdout, stderr) {
//   if (err) { throw err}
//   console.log('stdout', stdout)
//   console.log('stderr', stderr)
// })

// 通过该方法调用子进程， 并可以将环境变量信息传入子进程
// var exec = require('child_process').exec 
// let childPath = './gaojibiancheng/' + 'env_number_child.js'
// exec('node ' + childPath, {env: {number: 123}}, function (err, stdout, stderr) {
//   if (err) { throw err}
//   console.log('stdout: ' , stdout)
//   console.log('stderr', stderr)
// })

var spawn = require('child_process').spawn
var child = spawn('tail', ['-f', './test.log'])