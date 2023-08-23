import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedData, setSelectedData] = useState('');

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await axios.get('/get_options'); // Replace with your Flask API endpoint
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    }
    fetchOptions();
  }, []);

  const handleOptionChange = (event) => {
    const newSelectedOption = event.target.value;
    setSelectedOption(newSelectedOption);

    // Fetch data based on the selected option
    async function fetchData() {
      try {
        const response = await axios.get('/get_data', {
          params: {
            selected_option: newSelectedOption
          }
        }); // Replace with your Flask API endpoint
        setSelectedData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  };

  return (
    <div className="App">
      <h1>Dropdown and Data Example</h1>
      <select
        value={selectedOption}
        onChange={handleOptionChange}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <p>Selected Data: {selectedData}</p>
    </div>
  );
}

export default App;