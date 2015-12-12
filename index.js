var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = process.env.PORT || 9000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")


var net = require('net');
var mqtt = require('mqtt');
console.log("calling mqtt");
var client = mqtt.connect('mqtt://test.mosquitto.org');

wss.on("connection", function(ws) {
  /*var id = setInterval(function() {
    ws.send(JSON.stringify(new Date()), function() {  })
  }, 1000)*/
  
  

  console.log("websocket connection open")
  
  
  
  ws.on('message',function incoming(message) {  
    console.log('received: %s', message);
    client.subscribe(message);
      client.publish(message, 'Connected');
      
      console.log("subscribe"+ client.subscribe(message));
  })
  
  client.on('message', function (topic, payload, packet) {

    console.log(topic + '=' + payload);
    ws.send(
        String(payload)
    );
});
    

  ws.on("close", function() {
    console.log("websocket connection close")
    //clearInterval(id)
  })
})






