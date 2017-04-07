import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chatbox from './components/Chatbox.js';
var socket = require('socket.io-client')();

class App extends Component {

  componentDidMount() {
    socket.emit('App:Connection', "A user has loaded the app.");
    socket.on('Server:Message', function(msg){
      console.log('message: '+msg.text);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Chatbox socket={socket}></Chatbox>
      </div>
    );
  }
}

export default App;
