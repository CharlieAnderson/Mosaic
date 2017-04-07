import React, { Component } from 'react';
import '../App.css';
import MessageForm from './MessageForm';
import UsersList from './UsersList';
import MessageList from './MessageList';
import NameChangeForm from './NameChangeForm';

class Chatbox extends Component {
    constructor(props) {
        super(props);
        this.state = {users: [], messages:[], text: '', user:''};
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.messageRecieve = this.messageRecieve.bind(this);
        this._initialize = this._initialize.bind(this);
        this._userChangedName = this._userChangedName.bind(this);
        this._userJoined = this._userJoined.bind(this);
        this._userLeft = this._userLeft.bind(this);

    }

  componentDidMount() {

      //this.props.socket.on('chat message', this.messageRecieve);
      this.props.socket.on('Server:Connection', this._initialize);
      this.props.socket.on('Server:Message', this.messageRecieve);
      this.props.socket.on('Server:Connection', this._userJoined);
      this.props.socket.on('Server:Disconnection', this._userLeft);
      this.props.socket.on('Server:ChangeName', this._userChangedName);
  }

  _initialize(data) {
      var {users, name} = data;
      this.setState({users, user: name});
  }

  messageRecieve(message) {
      var {messages} = this.state;
      messages.push(message);
      this.setState({messages});
      console.log("message received");
  }

  _userJoined(data) {
      var {users, messages} = this.state;
      var {name} = data;
      users.push(name);
      messages.push({
          user: 'APPLICATION BOT',
          text : name +' Joined'
      });
      this.setState({users, messages});
  }

  _userLeft(data) {
      var {users, messages} = this.state;
      var {name} = data;
      var index = users.indexOf(name);
      users.splice(index, 1);
      messages.push({
          user: 'APPLICATION BOT',
          text : name +' Left'
      });
      this.setState({users, messages});
  }

  _userChangedName(data) {
      var {oldName, newName} = data;
      var {users, messages} = this.state;
      var index = users.indexOf(oldName);
      users.splice(index, 1, newName);
      messages.push({
          user: 'APPLICATION BOT',
          text : 'Change Name : ' + oldName + ' ==> '+ newName
      });
      this.setState({users, messages});
  }

  handleMessageSubmit(message) {
      var {messages} = this.state;
      messages.push(message);
      this.setState({messages: messages}); 
      console.log("handleMessageSubmit "+message.text);
      this.props.socket.emit('chat message', message);
  }

  handleChangeName(newName) {
      var oldName = this.state.user;
      this.props.socket.emit('change:name', { name : newName, oldName: oldName }, (result) => {
          if(!result) {
              return alert('There was an error changing your name');
          }
          var {users} = this.state;
          var index = users.indexOf(oldName);
          users.splice(index, 1, newName);
          this.setState({users, user: newName});
      });
  }

  render() {
      return (
          <div>
            <MessageList messages={this.state.messages}></MessageList>
            <UsersList users={this.state.users}></UsersList>
            <MessageForm onMessageSubmit={this.handleMessageSubmit} user={this.state.user}></MessageForm>
            <NameChangeForm onChangeName={this.handleChangeName}></NameChangeForm>
          </div>
      );
  }
}

export default Chatbox;