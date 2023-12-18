// components/StockTable.js
import React, { useEffect, useState } from 'react';
import WebSocket from 'websocket';

const StockTable = () => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001'); // Replace with appropriate WebSocket URL

    ws.onopen = () => {
      // Subscribe to stock updates on component mount
      ws.send(JSON.stringify({ action: 'subscribe', stocks: ['AAPL', 'GOOGL', 'MSFT'] }));
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      setStockData(receivedData); // Update state with received stock data
    };

    return () => {
      ws.close(); // Close WebSocket connection on component unmount
    };
  }, []);

  return (
    <div className="stock-table">
      <h2>Stock Table</h2>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock) => (
            <tr key={stock.symbol}>
              <td>{stock.symbol}</td>
              <td>{stock.price}</td>
              {/* Render additional stock data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
