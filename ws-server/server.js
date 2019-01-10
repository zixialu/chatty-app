const express = require('express');
const WebSocket = require('ws');
const SocketServer = WebSocket.Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () =>
    console.log(`Listening on ${PORT}`)
  );

// Create the WebSockets server
const wss = new SocketServer({ server });

// Broadcast JSON representation of an object
wss.broadcastJSON = obj => wss.broadcast(JSON.stringify(obj));

// Broadcast data to all active clients
wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};

wss.broadcastUsercount = () => {
  const usercount = wss.clients.size;
  wss.broadcastJSON({
    type: 'IncomingUsercount',
    usercount
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', ws => {
  console.log('Client connected');
  wss.broadcastUsercount();

  // Generate a random color for the socket
  ws.color = getRandomColorString();

  ws.on('message', data => {
    const messageObj = JSON.parse(data);
    messageObj.id = uuidv4();
    messageObj.color = ws.color;

    console.log(messageObj);

    // TODO: Perform validation on these objects
    switch (messageObj.type) {
      case 'postNotification':
        messageObj.type = 'incomingNotification';
        wss.broadcastJSON(messageObj);
        break;

      case 'postMessage':
        // Check if the message is an image url
        if (messageObj.content.match(/^.+:\/\/.+\/.+\.(jpg|png|gif)$/)) {
          messageObj.type = 'incomingImage';
          wss.broadcastJSON(messageObj);
        } else {
          messageObj.type = 'incomingMessage';
          wss.broadcastJSON(messageObj);
        }
        break;

      default:
        break;
    }
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    wss.broadcastUsercount();
  });
});

function getRandomColorString() {
  const colors = ['#9C27B0', '#009688', '#E91E63', '#2196F3'];
  return colors[Math.floor(Math.random() * 4)];
}
