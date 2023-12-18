const { startWebSocketServer } = require('../utils/websocket');
const { updateStockPrices } = require('../services/stockService');

const setupWebSocket = (server) => {
  const wss = startWebSocketServer(server);
  updateStockPrices(wss);
};

module.exports = { setupWebSocket };
