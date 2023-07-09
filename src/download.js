import React, { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

function CsvExport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('/results') // Replace with your API endpoint URL
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const exportToCsv = () => {
    const csvContent = convertToCsv(data);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'support_equipment_results.csv');
  };

  const convertToCsv = data => {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(obj => Object.values(obj).join(','));
    return [header, ...rows].join('\n');
  };

  return (
    <div>
      <button
        onClick={exportToCsv}
        style={{ backgroundColor: "green"}}
      >
        Export Results
      </button>
    </div>
  );
}

export default CsvExport;










;