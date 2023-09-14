import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChangeColumns() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const perPage = 5; // Number of items per page

  useEffect(() => {
    // Fetch initial data from Flask backend
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    axios.get(`/api/items?page=${page}&per_page=${perPage}`)
      .then(response => {
        setItems(response.data.data);
        setTotalItems(response.data.total_items);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleEdit = (item) => {
    // Handle item editing here
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
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(totalItems / perPage);

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
              <td
                contentEditable={true}
                onBlur={(e) => handleEdit({ ...item, name: e.target.innerText })}
              >
                {item.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
}

export default ChangeColumns;
