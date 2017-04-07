const express = require('express');
const fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 3001));

app.use('/', function(req, res) {  
  res.send('<h1>Hello world</h1>');
});

io.on('connection', function (socket) {
  console.log("A user has connected.");
  socket.broadcast.emit("Server:Connection", {users:[], name:"User"});

  socket.on('disconnect', function(){
    console.log('A user has disconnected.');
    socket.broadcast.emit("Server:Disconnection", {users:[], name:"User"});
  });

  socket.on('App:Connection', function (data) {
    console.log(data);
  });

  socket.on('App:Disconnection', function (data) {
    console.log(data);

  });

  socket.on('chat message', function(msg){
    console.log(msg.user +' sent message: ' + msg.text);
    socket.broadcast.emit("Server:Message", msg);
  });

  socket.on('change:name', function(msg){
    console.log('A user changed name from '+msg.oldName+' to '+msg.name);
    socket.broadcast.emit("Server:ChangeName", msg);
  });

  socket.on('error', function(err) {
    console.log("socker error: " + err);
  });
});


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

server.listen(3001);
