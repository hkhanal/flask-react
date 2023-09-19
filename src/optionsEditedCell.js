import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]); // Initialize options as an empty array
  const [editedItemId, setEditedItemId] = useState(null);
  const [editedItemValue, setEditedItemValue] = useState('');
  
  useEffect(() => {
    // Fetch initial data from Flask backend
    axios.get('/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

    // Fetch options from Flask backend
    axios.get('/api/options')
      .then(response => {
        setOptions(response.data.options);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  }, []);

  const handleEdit = (item) => {
    // Handle item editing here
    if (item.name !== null) {
      const updatedItems = [...items];
      const index = updatedItems.findIndex(i => i.id === item.id);
      if (index !== -1) {
        updatedItems[index] = item;
        setItems(updatedItems);

        // Send updated data to Flask backend
        axios.put('/api/items', updatedItems)
          .then(response => {
            console.log(response.data.message);
          })
          .catch(error => {
            console.error('Error updating data:', error);
          });
      }
    }
    setEditedItemId(null);
  };

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                {editedItemId === item.id ? (
                  <select
                    value={editedItemValue}
                    onChange={(e) => setEditedItemValue(e.target.value)}
                    onBlur={() => {
                      handleEdit({ ...item, name: editedItemValue });
                      setEditedItemValue(''); // Clear the edited item value
                    }}
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span onClick={() => {
                    setEditedItemId(item.id);
                    setEditedItemValue(item.name);
                  }}>
                    {item.name}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
