// var spawn = require('child_process').spawn 
// var child = spawn('ls', ['-la'])
// child.stdout.on('data', function (data) {
//   console.log('data from child: ' + data)
// })
// child.on('exit', function (code) {
//   console.log('child process terminate with code' + code)
// })

// var spawn = require('child_process').spawn 
// var child = spawn('ls', ['does_not_exist.txt'])
// child.on('exit', function (code) {
//   console.log('child process terminate with code ' + code)
// })

var spawn = require('child_process').spawn 
var child = spawn('sleep', ['10'])
setTimeout(function () {
  child.kill()
}, 1000)
child.on('exit', function (code, signal) {
  if (code) {
    console.log('child process')
  } else if (signal) {
    console.log('child process terminated because of signal ' + signal);
  }
})