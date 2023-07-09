import React, { useState} from 'react';

import axios from "axios";



const DataframeDisplay = () => {
    const [dfdata, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isVisible, setIsVisible] = useState(false);
    const [editedData, setEditedData] = useState(dfdata);

   
    const handleClick = () => {
        async function fetchTableData() {
          const response = await axios.get('/results');
          setData(response.data);
          setIsVisible(true);
        }
        fetchTableData();
      };


    const itemsPerPage = 20;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dfdata.slice(indexOfFirstItem, indexOfLastItem);
    //const [editedData, setEditedData] = useState(dfdata);
    const totalPages = Math.ceil(dfdata.length / itemsPerPage);
   
     const handleCellChange = (rowIndex, columnId, value) => {
        //const newData = [...editedData];
        const newData = [...currentItems];
        newData[rowIndex][columnId] = value;
        setEditedData(newData);
      };



    const handlePageClick = (event, page) => {
        event.preventDefault();
        setCurrentPage(page);

    };
    const handlePrevClick = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
    };

    const renderPagination = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return (
            <div>
                <button onClick={handlePrevClick} disabled={currentPage === 1}>
                    Prev
                </button>
                {pageNumbers.slice(currentPage - 1, currentPage + 2).map(number => (
                    <button key={number} onClick={() => setCurrentPage(number)}>
                        {number}
                    </button>
                ))}
                <button onClick={handleNextClick} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        );
    };


    return (
        <div>
            <h1>All Prediction</h1>
            <button onClick={handleClick}>Show Prediction </button>
            {isVisible && (
            <table>
                <thead>
                    <tr>
                        <th > Index</th>
                        <th>Length</th>
                        <th>Diameter</th>
                        <th>Height</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((row, index) => (
                        <tr key={index}>
                            <td>{row.Length}</td>
                            <td>{row.Diameter}</td>
                            <td>
                            {row.Height}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
              )}
            {renderPagination()}
            <p> Total Number of Pages: {totalPages}</p>
            <p> Total data points: {dfdata.length}</p>
        </div>
    );
};

export default DataframeDisplay;