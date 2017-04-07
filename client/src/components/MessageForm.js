import React, { Component } from 'react';
import '../App.css';

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  //this._handleMessage = this._handleMessage.bind(this);
  }

    componentDidMount() {
      //this._handleMessage();
    }

  handleChange(event) {
    this.setState({text: event.target.value});
  }
/*
  _handleMessage() {
      this.socket.on('chat message', function(message) {
          console.log("HAPENING");
          var list = document.getElementById("messages");
          var item = document.createElement("li");
          item.appendChild(document.createTextNode(message));
          list.appendChild(item);
      });
  }
*/
  handleSubmit(event) {
    event.preventDefault();
    var message = {
      user: this.props.user,
      text: this.state.text
    }
    this.props.onMessageSubmit(message);
    this.setState({text: ''});

/*
    this.socket.emit('chat message', this.state.text);
    console.log("handling message submission");
    var list = document.getElementById("messages");
    var item = document.createElement("li");
    item.appendChild(document.createTextNode(this.state.text));
    list.appendChild(item);
*/
  }

  render() {
    return (
      <div className="message-form-div">
        <form onSubmit={this.handleSubmit}>
          <label>
            Message:
            <input id="m" autoComplete="off" type="text" value={this.state.text} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

export default MessageForm;
