const WebSocket = require('ws');

const startWebSocketServer = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('close', () => {
      console.log('Client disconnected');
    });
  });

  return wss;
};

module.exports = { startWebSocketServer };
