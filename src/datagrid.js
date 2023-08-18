import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, editors } from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';

const { TextEditor } = editors;

function EditData() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('/get_excel_data');
      setRows(response.data);
    }
    fetchData();
  }, []);

  const handleCellEdit = async ({ rowIdx, column, value }) => {
    const updatedRow = { ...rows[rowIdx], [column.key]: value };
    const response = await axios.post('/update_cell', {
      rowIndex: rowIdx,
      columnName: column.key,
      newValue: value,
    });

    if (response.data.message === 'Cell updated successfully') {
      setRows(rows.map((row, index) => (index === rowIdx ? updatedRow : row)));
    }
  };

  const columns = Object.keys(rows[0] || {}).map((key) => ({
    key,
    name: key,
    editable: key === 'EditableColumn', // Make the desired column editable
    editor: TextEditor,
  }));

  return (
    <div className="App">
      <h1>Editable Excel Data</h1>
      <DataGrid
        columns={columns}
        rows={rows}
        onCellEditCommit={handleCellEdit}
      />
    </div>
  );
}

export default EditData;