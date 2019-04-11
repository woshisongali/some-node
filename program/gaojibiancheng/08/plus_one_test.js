var spawn = require('child_process').spawn
var child = spawn('node', ['./gaojibiancheng/08/plus_one.js'])

setInterval(function() {

  // Create a random number smaller than 10.000
  var number = Math.floor(Math.random() * 10000);
  
  // Send that number to the child process:
  child.stdin.write(number + "\n");

  // Get the response from the child process and print it:
  child.stdout.once('data', function(data) {
    console.log('child replied to ' + number + ' with: ' + data);
  });
}, 1000);

child.stderr.on('data', function(data) {
  process.stdout.write(data);
});