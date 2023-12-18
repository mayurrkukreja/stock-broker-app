const fetch = require('node-fetch');
const stockData = require('../models/stockData.json');
const polygonAPIURL = 'https://api.polygon.io/...'; // Replace with actual Polygon API endpoint

const updateStockPriceAndBroadcast = async (stock, wss) => {
  try {
    const response = await fetch(`${polygonAPIURL}/v1/stock/${stock.symbol}/price`);
    const data = await response.json();
    stock.price = data.price;
    
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ symbol: stock.symbol, price: stock.price }));
    });
  } catch (error) {
    console.error(`Error updating ${stock.symbol} price: ${error}`);
  }
};

const updateStockPrices = (wss) => {
  stockData.forEach((stock) => {
    setInterval(() => {
      updateStockPriceAndBroadcast(stock, wss);
    }, stock.refreshInterval * 1000);
  });
};

module.exports = { updateStockPrices };
