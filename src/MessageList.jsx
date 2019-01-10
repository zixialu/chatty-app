import React, { Component } from 'react';

import Message from './Message.jsx';

export default class MessageList extends Component {
  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
    const messageElements = this.props.messages.map(message => (
      <Message message={message} key={message.id} />
    ));
    return (
      <main className="messages">
        {messageElements}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
      </main>
    );
  }
}
