// // server.js
// const express = require('express');
// const http = require('http');
// const { fetchAndBroadcastStocksData, getStocksData } = require('./controllers/stockController');
// const { initializeWebSocketServer } = require('./controllers/websocketController');

// const app = express();
// const server = http.createServer(app);

// // Middleware and other configurations as needed

// initializeWebSocketServer(server); // Initialize WebSocket server

// // Endpoint to fetch and broadcast stocks data
// app.get('/api/stocks', (req, res) => {
//   const apiKey = '0_MMGnoEeKmbi5xXmB8atwwJxw0Ba9ki'; // Replace with your actual Polygon API key
//   fetchAndBroadcastStocksData(apiKey); // Fetch stocks data and broadcast via WebSocket
//   res.send('Stocks data fetched and broadcasted');
// });

// // Endpoint to get stocks data
// app.get('/api/stocksData', getStocksData);

// const PORT = process.env.PORT || 3001;

// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });



const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
// cors middleware
app.use(cors());
const port = 3001;

const apiKey = '0_MMGnoEeKmbi5xXmB8atwwJxw0Ba9ki'; // Replace with your actual Polygon API key
const polygonAPIURL = 'https://api.polygon.io/v2';

//   const response = (`https://api.polygon.io/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${apiKey}`);


// Route to fetch top 20 stocks with opening prices
app.get('/stocks', async (req, res) => {
  try {
    const response = await axios.get(`${polygonAPIURL}/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=${apiKey}`);
    const stockData = response.data;
    console.log(stockData);
    res.json(stockData); // Send stock data as JSON response
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error fetching stock data');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
