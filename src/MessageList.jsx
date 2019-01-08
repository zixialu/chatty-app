import React, { Component } from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {
  render() {
    // return this.props.messages.map(message => <Message message={message} />);
    return (
      <main className="messages">
        <Message />
      </main>
    );
  }
}
