const express = require("express");
const app = express();

var socket = require("socket.io");

//  const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000;

//  http.listen(PORT, ()=>{
//      console.log('Server is running')
//  })

var server = app.listen(PORT, () => {
  console.log("Server Started");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

var io = socket(server);

io.on("connection", function (socket) {
  console.log("socket connected");
  socket.on('chat', function(message){
    socket.broadcast.emit('chat', message)
    console.log('backend se bhi gya')
  })
 
});
