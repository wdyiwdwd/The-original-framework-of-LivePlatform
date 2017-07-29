//建立websocket链接
export const wsConnect = (url, responceFun) => {
    let socket = new WebSocket("ws://" + window.location.host + url)
    if(typeof responceFun == 'function'){
        socket.onmessage = function(e){
            console.log("WebSocket receive" + e.data)
            responceFun(e)
        }
    }
    return socket
}

//建立websocket链接
export const wsConnectDetail = (url, openFun, receiveFun, errorFun, closeFun) => {
    let socket = new WebSocket("ws://" + window.location.host + url)
    if(typeof openFun == 'function'){
      socket.onopen= function(e){
          console.log("WebSocket open " + e.data)
          openFun(e)
      }
    }
    if(typeof receiveFun == 'function'){
      socket.onmessage = function(e){
          console.log("WebSocket receive " + e.data)
          receiveFun(e)
      }
    }
    if(typeof errorFun == 'function'){
      socket.onerror = function(e){
          console.log("WebSocket error " + e.data)
          errorFun(e)
      }
    }
    if(typeof closeFun == 'function'){
      socket.onclose = function(e){
          console.log("WebSocket close " + e.data)
          closeFun(e)
      }
    }
    return socket
}

//通过websocket协议进行发送消息，接收消息
export const wsSend = (socket, data) => {
    //如果未连接到websocket
    if(socket == null || socket.readyState === WebSocket.CLOSED) {
        console.log("websocket未连接.")
    } else {
        //通过websocket发送数据
        console.log("websocket send " + data)
        socket.send(data)
    }
}

//关闭websocket链接
export const wsClose = (socket) => {
  if (socket != null && socket.readyState === WebSocket.OPEN) {
      socket.close();//关闭websocket
      console.log('websocket已关闭')
  }
}

export default {
  wsConnect,
  wsSend,
  wsClose,
}
