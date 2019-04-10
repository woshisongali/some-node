// 引入http标准模块,CommonJS模块
const http = require("http");
const fs = require("fs");
const ws = require("socket.io");
const url = require("url")

// 当前在线人数
let count = 0;

// 总访客人数
let totalCount = 0;

// 创建一个web服务器
const server = http.createServer(function(request, response) {
	let pathname = url.parse(request.url).pathname
	// console.log(pathname)
	
	if (pathname == '/' || ~pathname.indexOf('socket.io')) {
		response.writeHead(200, {
			"Content-Type": "text/html;charset=UTF-8"
		});
		const html = fs.readFileSync("./chartRoom/chatRoom.html");
		response.end(html);
	} else if (~pathname.indexOf('.css')) {
		response.writeHead(200, {
			"Content-Type": "text/css;charset=UTF-8"
		});
		const html = fs.readFileSync('.' + pathname);
		response.end(html);
	} else {
		response.writeHead(200, {
			"Content-Type": "text/html;charset=UTF-8"
		});
		response.end('server start');
	}

	// 读取文件
	

});

// 基于当前web服务器开启socket实例
const io = ws(server);

// 检测连接事件
io.on("connection", function(socket) {

	console.log("当前有用户连接");
	count++;
	totalCount++;
	console.log("count:" + count);

	let name = '';

	// 加入群聊
	socket.on("join", function(message) {
		console.log(message);
		name = message.name;
		console.log(name + "加入了群聊");
        
        // 给公众发消息
		socket.broadcast.emit("joinNoticeOther", {
			name: name,
			action: "加入了群聊",
			count: count
		});

        // 给自己发消息
		socket.emit("joinNoticeSelf", {
			count: count,
			id: totalCount
		});
	});

	// 接收客户端所发送的信息
	socket.on("message", function(message) {
		console.log(message);
		// 向所有客户端广播发布的消息
		io.emit("message", message);
	});

	//	 监听到连接断开
	socket.on("disconnect", function() {
		count--;
		console.log(name + "离开了群聊")
		io.emit("disconnection", {
			count: count,
			name: name
		});
	});

});

// 服务器监听端口
server.listen(3000);
