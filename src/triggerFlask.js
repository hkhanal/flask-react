
import React from 'react';
import axios from 'axios';

function App() {
  const triggerScript = async () => {
    try {
      const response = await axios.get('/trigger-script'); // Replace with your Flask server URL
      console.log(response.data.message); // Display the response from Flask
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Trigger Flask Script from React</h1>
      <button onClick={triggerScript}>Trigger Script</button>
    </div>
  );
}

export default App;





