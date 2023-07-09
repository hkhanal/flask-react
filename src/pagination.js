import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";

const EditableColumn = () => {


  const [dfdata, setData] = useState([])
  const [currentPage, setCurrentPage] = useState(0);
  const [editedData, setEditedData] = useState(dfdata);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    async function fetchTableData() {
      const response = await axios.get('/results');
      setData(response.data);
      setIsVisible(true);
    }
    fetchTableData();
  };

  const itemsPerPage = 20;
  const pageCount = Math.ceil(editedData.length / itemsPerPage)

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    //setEditedData(dfdata.slice(selected * itemsPerPage, (selected + 1) * itemsPerPage));
  };

  const handleCellChange = (rowIndex, columnId, value) => {
    const newData = [...editedData];
    newData[(currentPage * itemsPerPage) + rowIndex][columnId] = value;
    setEditedData(newData);
  };
  return (
    <div>
     <button onClick={handleClick}>Show Prediction </button>
    {isVisible && (
      <table>
        <thead>
        <tr>
            <th>Index</th>
            <th>Length</th>
            <th>Diameter</th>
            <th>Height</th>
        </tr>
        </thead>
        <tbody>
          {editedData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((row, index) => (
            <tr key={index}>
              <td>{index + currentPage * itemsPerPage}</td>
              <td>{row.Length}</td>
              <td>{row.Diameter}</td>
              <td>
                <input
                  type="text"
                  value={row.Height}
                  onChange={(event) => handleCellChange(index, "Height", event.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
      </div>
  );
}

export default EditableColumn;