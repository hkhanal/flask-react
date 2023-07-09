
import React, { useState, useEffect} from "react";
import Plot from 'react-plotly.js';
import axios from "axios";
import MyPlot from "./jsplot";
import DataframeDisplay from "./dataframe";
//import GetData from './dataload'
//import LoadData  from "./dretrive";





function TableComponent() {
  const [tableData, setTableData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);



  const handleClick = () => {
    async function fetchTableData() {
      const response = await axios.get('/table-data');
      setTableData(response.data);
      setIsVisible(true);
    }
    fetchTableData();
  };

  return (
    <div>
      <button onClick={handleClick}>Show Table</button>
      {isVisible && (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )}
   <MyPlot/>
  </div>
  );
}







function FileUploader() {
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState({});

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/upload', {
        method: 'POST',
        body: formData
       //headers: {
       //   'Content-Type': 'application/json'
       // }
      })
      .then(response => response.json())
      .then(data => setResponseData(data));;
    }
  };  
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadClick}>Upload</button>
      <p>{responseData.message}</p>
      <DataframeDisplay />
      <TableComponent/>
    </div>
  );
}

export default FileUploader;