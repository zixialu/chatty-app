import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';

class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      currentUser: { name: null }
    };
  }

  componentDidMount() {
    this.setState({
      // currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          id: uuidv4()
        },
        {
          username: 'Anonymous',
          content:
            'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          id: uuidv4()
        }
      ]
    });

    setTimeout(() => {
      // Add a new message to the list of messages in the data store
      const newMessage = {
        id: 3,
        username: 'Michelle',
        content: 'Hello there!'
      };
      const messages = this.state.messages.concat(newMessage);
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({ messages });
    }, 3000);
  }

  postMessage = newMessageContent => {
    const username = this.state.currentUser.name
      ? this.state.currentUser.name
      : 'Anonymous';

    if (newMessageContent) {
      this.setState({
        messages: this.state.messages.concat({
          username,
          content: newMessageContent,
          id: uuidv4()
        })
      });
    }
  };

  updateCurrentUser = newUsername => {
    const oldUsername = this.state.currentUser.name;

    this.setState({
      currentUser: { name: newUsername },
      messages: this.state.messages.concat({
        isSystemMessage: true,
        oldName: oldUsername,
        newName: newUsername,
        id: uuidv4()
      })
    });
  };

  render() {
    return (
      <div>
        <NavBar />
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
