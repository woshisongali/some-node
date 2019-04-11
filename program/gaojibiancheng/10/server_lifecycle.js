// 可通过telnet localhost 4001 命令建立以客户端
// var server = require('net').createServer()
// var port = 4001 
// server.on('listening', function () {
//   console.log('server is listening on port', port)
// })
// server.on('connection', function (socket) {
//   console.log('server has a new connection') 
//   socket.end()
//   server.close()
// })
// server.on('close', function () {
//   console.log('server is now closed')
// })
// server.on('error', function (err) {
//   console.log('error occurred: ', err.message)
// })
// server.listen(port)

var server = require('net').createServer(function (socket) {
  console.log('new connection')
  socket.setEncoding('utf8')
  socket.write('hello you can start typing Type quit to exit \n')
  socket.on('data', function (data) {
    console.log('got:' + data.toString())
    if (data.trim().toLowerCase() === 'quit') {
      socket.write('Bye bye')
      return socket.end()
    }
    socket.write(data)
  })

  socket.on('end', function () {
    console.log('Client. connection ended')
  })
}).listen(4001)