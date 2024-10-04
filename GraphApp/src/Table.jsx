import React, { useState, useEffect } from 'react';

import './index.css';

const EditableTable = ({ nodeTable, onTableChange }) => {
  const [rows, setRows] = useState([{ property: '', value: '' }]); 

  useEffect(() => {
    setRows( nodeTable || [{ key: '', value: '' }]);
  }, [nodeTable]);
  
  const handleRowChange = (index, field, value) => {
	const updatedRows = [...nodeTable]; 
	updatedRows[index][field] = value; 
	setRows(updatedRows); 
	onTableChange(updatedRows);
  };

  const handleAddRow = () => {
	console.log("add row");
	setRows([...nodeTable, { property: '', value: '' }]); 
	onTableChange(rows);
  }; 

  return (
	<div>
	  <table border="0" cellPadding="3">
		<thead>
		  <tr>
			<th>Property</th>
			<th>Value</th>
		  </tr>
		</thead>
		<tbody>
		  {nodeTable.map((row, index) => (
			<tr key={index}>
			  <td>
				<input
				  type="text"
				  value={row.property}
				  onChange={(e) => handleRowChange(index, 'property', e.target.value)} // Handle key input change
				/>
			  </td>
			  <td>
				<input
				  type="text"
				  value={row.value}
				  onChange={(e) => handleRowChange(index, 'value', e.target.value)} // Handle value input change
				/>
			  </td>
			</tr>
		  ))}
		</tbody>
	  </table>
	  
	  {/* Button to add a new row */}
	  <button onClick={handleAddRow} style={{ marginTop: '10px' }}>
		Add Row
	  </button>
	</div>
  );
};

export default EditableTable;