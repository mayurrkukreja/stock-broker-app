// components/StockList.js
import React, { useEffect, useState } from 'react';
import WebSocket from 'websocket';

const StockList = () => {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const ws = new WebSocket('http://localhost:3001');

    ws.onopen = () => {
      ws.send(JSON.stringify(['AAPL', 'GOOGL', 'MSFT'])); // Example stock IDs
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setStockData(receivedData);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      <h2>Stock List</h2>
      <ul>
        {Object.entries(stockData).map(([stockId, price]) => (
          <li key={stockId}>
            {stockId} - {price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockList;
