import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');

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
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/send_option', { selectedOption }); // Replace with your Flask API endpoint
      console.log(response.data.message); // Display the response from Flask
    } catch (error) {
      console.error('Error sending option:', error);
    }
  };

  return (
    <div className="App">
      <h1>Dropdown Example</h1>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
      <button onClick={handleSubmit}>Send Option</button>
    </div>
  );
}

export default App;