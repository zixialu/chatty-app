import React, { Component } from 'react';

export default class Message extends Component {
  render() {
    switch (this.props.message.type) {
      case 'incomingNotification':
        return <SystemMessage message={this.props.message} />;

      case 'incomingMessage':
        return <ChatMessage message={this.props.message} />;

      default:
        return;
    }
  }
}

function SystemMessage(props) {
  return (
    <div className="message system">
      {props.message.oldName || 'Anonymous'} changed their name to{' '}
      {props.message.newName || 'Anonymous'}.
    </div>
  );
}

function ChatMessage(props) {
  return (
    <div className="message">
      <span className="message-username">{props.message.username}</span>
      <span className="message-content">{props.message.content}</span>
    </div>
  );
}
