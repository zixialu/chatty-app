import React, { Component } from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentUser: { name: null },
      usercount: 0
    };
  }

  componentDidMount() {
    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = () => {
      console.log('Connected to WebSocket');
    };

    this.socket.onmessage = payload => {
      console.log('Got message from server', payload);

      const json = JSON.parse(payload.data);

      if (json.type === 'IncomingUsercount') {
        // Update user counts given type = 'IncomingUsercount'
        this.setState({
          usercount: json.usercount
        });
      } else {
        // Handle message otherwise
        this.setState({
          messages: [...this.state.messages, json]
        });
      }
    };

    this.socket.onclose = () => {
      console.log('Disconnected from the WebSocket');
    };
  }

  postMessage = content => {
    const username = this.state.currentUser.name || 'Anonymous';

    if (content) {
      this.socket.send(
        JSON.stringify({
          type: 'postMessage',
          username,
          content
        })
      );
    }
  };

  updateCurrentUser = newUsername => {
    const oldUsername = this.state.currentUser.name;

    if (newUsername !== oldUsername) {
      this.setState(
        {
          currentUser: { name: newUsername }
        },
        () => {
          this.socket.send(
            JSON.stringify({
              type: 'postNotification',
              oldName: oldUsername,
              newName: newUsername
            })
          );
        }
      );
    }
  };

  render() {
    return (
      <div>
        <NavBar usercount={this.state.usercount} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          currentUser={this.state.currentUser}
          onSubmitMessage={this.postMessage}
          onSubmitUser={this.updateCurrentUser}
        />
      </div>
    );
  }
}

export default App;
