import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/stocks'); // Replace with your backend URL
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStockData(data.results); // Setting the entire results array
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Stock Data</h1>
      <div className="table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Ticker</th>
              <th>Volume</th>
              <th>Opening Price</th>
              <th>Closing Price</th>
              {/* Add headers for other properties */}
            </tr>
          </thead>
          <tbody>
            {stockData.map((data, index) => (
              <tr key={index}>
                <td>{data.active}</td>
                <td>{data.v}</td>
                <td>{data.o}</td>
                <td>{data.c}</td>
                {/* Render other properties as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
