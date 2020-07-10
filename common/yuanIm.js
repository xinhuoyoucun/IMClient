let ws = {}
const webSocketUrl="ws://127.0.0.1:9999/im"
let userInfo={}
let timer=""

let IM = {
	getInstance: (token) => {
		onConnection()
		userInfo.token=token
	},
	sendMsg: (msg) => {
		if (msg.msg.type == "text") {
			console.log("文本消息");
			sendMsg(msg)
		} else {
			console.log("其他类型消息，以二进制方式发送");
			sendBolb(msg)
		}
	},
	onwillreconnect: ()=>{
		console.log("断线重连中...");
		onConnection()
	},
	close:()=>{
		console.log("断开连接");
		// 监听socket关闭
		ws.onclose = onClose(event)
	}
}


function onConnection() {
	if (typeof(WebSocket) === "undefined") {
		console.log("您的浏览器版本过低，不支持websocket");
		alert("您的浏览器版本过低，不支持websocket")
	} else {
		// 实例化socket
		ws = new WebSocket(webSocketUrl)
		// 监听socket连接
		// 监听消息
		onOpen()
		// 监听socket错误信息
		onError()
		// 监听socket关闭
		onClose()
		// 监听socket消息
		onMessage()
		
	}
}

function onOpen() {
	ws.onopen = function(event) {
	  console.log("WebSocket is open now.");
	  checkWebSocketState()
	  // keepAlive();
	};
}

function onError() {
	ws.onerror = function(event) {
	  console.error("WebSocket error observed:", event);
	};
}

function onClose() {
	ws.onclose = function(event) {
	  console.log("WebSocket is closed now.");
	  window.clearInterval(timer);
	};
}

function onMessage() {
	ws.onmessage = function(event) {
	  console.log("WebSocket message received:", event.data);
	};
}

function keepAlive(){
	timer = setInterval(() => {
		try {
			let keepAlive={
				type:"keepAlive"
			}
			sendMsg(keepAlive);
			console.log("发送心跳包");
		} catch (err) {
			console.log("断线了: ", err);
			onConnection();
		}
	}, 1000*60);
}

function login(){
	let loginInfo = {
		type: "login",
		msg: {
			token: userInfo.token
		}
	}
	sendMsg(loginInfo)
	console.log("登录中...");
}

function sendMsg(msg){
	ws.send(JSON.stringify(msg))
}

function sendBolb(msg){
	ws.send(new Bolb(msg))
}

//检查websocket连接状态
function checkWebSocketState() {
	switch (ws.readyState) {
		case WebSocket.CONNECTING:
			console.log("正在连接");
			break;
		case WebSocket.OPEN:
			console.log("连接成功，可以通信了");
			login()
			break;
		case WebSocket.CLOSING:
			console.log("连接正在关闭");
			break;
		case WebSocket.CLOSED:
			window.clearInterval(this.timer);
			console.log("连接已经关闭，或者打开连接失败。");
			break;
		default:
			console.log("未知状态");
			break;
	}
}


module.exports = {
	IM: IM
}
