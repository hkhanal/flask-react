import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

const DataPlotComponent = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/get_data') // Replace with your API endpoint
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Data Plot</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <Plot
          data={[
            {
              x: data.x || [],
              y: data.y || [],
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'blue' },
            },
          ]}
          layout={{ width: 600, height: 400, title: 'Data Plot' }}
        />
      )}
    </div>
  );
};