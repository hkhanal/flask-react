import React from 'react';
import Plot from 'react-plotly.js';


function MyPlot() {

    const data = [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
      }
    ];
    
    const layout = {
      title: 'My Plot'
    };
    return (
      <Plot
        data={data}
        layout={layout}
      />
    );
  }
  export default MyPlot;