import React from 'react';

export default function NavBar(props) {
  return (
    <nav className="navbar">
      <a href="/" className="navbar-brand">
        Chatty
      </a>
      <Usercount usercount={props.usercount} />
    </nav>
  );
}

function Usercount(props) {
  const onlineString = `${props.usercount} ${
    props.usercount === 1 ? 'user' : 'users'
  } online`;
  return <span>{onlineString}</span>;
}
