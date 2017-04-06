import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

  var socket = require('socket.io-client')('http://localhost');
  socket.on('connect', function(){
    console.log("Socket connection");
  });
  socket.on('event', function(data){});
  socket.on('disconnect', function(){});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
