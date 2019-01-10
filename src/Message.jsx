import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    switch (this.props.message.type) {
      case 'incomingNotification':
        return <SystemMessageContent message={this.props.message} />;

      case 'incomingMessage':
        return <ChatMessageContent message={this.props.message} />;

      default:
        return;
    }
  }
}

function SystemMessageContent(props) {
  return (
    <div className="message system">
      {props.message.oldName || 'Anonymous'} changed their name to{' '}
      {props.message.newName || 'Anonymous'}.
    </div>
  );
}

function ChatMessageContent(props) {
  return (
    <div className="message">
      <span className="message-username">{props.message.username}</span>
      <span className="message-content">{props.message.content}</span>
    </div>
  );
}
