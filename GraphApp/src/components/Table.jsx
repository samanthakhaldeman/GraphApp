import React, { useState, useEffect } from 'react';

import '../styles/index.css';

const EditableTable = ({ nodeTable, onTableChange, tableType }) => {
  const [SRows, setSRows] = useState([{ property: '', value: '' }]);
  const [VRows, setVRows] = useState([{ property: '', value: '' }]); 

  useEffect(() => {
    setSRows( nodeTable || [{ key: '', value: '' }]);
	setVRows( nodeTable || [{ key: '', value: '' }]);
  }, [nodeTable]);
  
  const handleRowChange = (index, field, value) => {
	const updatedRows = [...nodeTable]; 
	updatedRows[index][field] = value; 
	if (tableType == "system") {
		setSRows(updatedRows);
	}
	else {
		setVRows(updatedRows);
	}
	onTableChange(tableType, updatedRows);
  };

  const handleAddRow = () => {
	console.log("add row");
	if (tableType == "system") {
		setSRows([...nodeTable, { property: '', value: '' }]); 
		onTableChange(tableType, SRows);
	}
	else {
		setVRows([...nodeTable, { property: '', value: '' }]);
		onTableChange(tableType, VRows);
	}
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
	  <button onClick={handleAddRow} className='button'>
		Add Row
	  </button>
	</div>
  );
};

export default EditableTable;