import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      content: ''
    };
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          value={this.state.username}
          onChange={this._updateUsername}
          onKeyUp={this._handleSubmitUser}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          value={this.state.content}
          onChange={this._updateContent}
          onKeyUp={this._handleSubmitMessage}
        />
      </footer>
    );
  }

  _updateUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  _updateContent = e => {
    this.setState({
      content: e.target.value
    });
  };

  _handleSubmitUser = e => {
    if (e.key === 'Enter') {
      this.props.onSubmitUser(this.state.username);
    }
  };

  _handleSubmitMessage = e => {
    if (e.key === 'Enter') {
      this.props.onSubmitMessage(this.state.content);
    }
  };
}
