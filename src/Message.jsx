import React from 'react';

export default function Message(props) {
  switch (props.message.type) {
    case 'incomingNotification':
      return <SystemMessageContent message={props.message} />;

    case 'incomingMessage':
      return <ChatMessageContent message={props.message} />;

    case 'incomingImage':
      return <ImageMessageContent message={props.message} />;

    default:
      return;
  }
}

function SystemMessageContent(props) {
  return (
    <div className="message system" style={{ color: props.message.color }}>
      {props.message.oldName || 'Anonymous'} changed their name to{' '}
      {props.message.newName || 'Anonymous'}.
    </div>
  );
}

function ChatMessageContent(props) {
  return (
    <div className="message">
      <span className="message-username" style={{ color: props.message.color }}>
        {props.message.username}
      </span>
      <span className="message-content">{props.message.content}</span>
    </div>
  );
}

function ImageMessageContent(props) {
  return (
    <div className="message">
      <span className="message-username" style={{ color: props.message.color }}>
        {props.message.username}
      </span>
      <span className="message-content">
        <img src={props.message.content} className="message-image" />
      </span>
    </div>
  );
}
