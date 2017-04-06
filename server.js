const express = require('express');
const fs = require('fs');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('port', (process.env.PORT || 3001));

io.on('connection', function (socket) {
  console.log("CONNECTED ");
  socket.on('msg', function (data) {
    console.log(data);
  });
});


// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

server.listen(3001);
