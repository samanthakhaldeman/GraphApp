import React, { useState, useEffect, useRef } from 'react';

const Table = ({ table, onTableChange, tableType }) => {
	console.log(typeof table);
	const [SRows, setSRows] = useState([{ type: '', value: '' }]);
	const [VRows, setVRows] = useState([{ type: '', value: '' }]);
	const [CRows, setCRows] = useState([{ type: '', value: '' }]) ;
  
	useEffect(() => {
	  setSRows( table || [{ type: '', value: '' }]);
	  setVRows( table || [{ type: '', value: '' }]);
	  setCRows( table || [{ type: '', value: '' }]);
	}, [table]);
	
	const handleRowChange = (index, field, value) => {
	  const updatedRows = [...table]; 
	  updatedRows[index][field] = value; 
	  if (tableType == "system") {
		  setSRows(updatedRows);
	  }
	  else if (tableType == "vulnerability") {
		  setVRows(updatedRows);
	  }
	  else {
		  setCRows(updatedRows);
	  }
	  onTableChange(tableType, updatedRows);
	};
  
	const handleAddRow = () => {
	  console.log("add row");
	  if (tableType == "system") {
		  setSRows([...table, { type: '', value: '' }]); 
		  onTableChange(tableType, SRows);
	  }
	  else if (tableType == "vulnerability") {
		  setVRows([...table, { type: '', value: '' }]);
		  onTableChange(tableType, VRows);
	  }
	  else {
		  setCRows([...table, { type: '', value: '' }]);
		  onTableChange(tableType, CRows);
	  }
	}; 
  
	return (
	  <div>
		<table border="0" cellPadding="3">
		  <thead style={{marginBottom: '5px'}}>
			<tr>
			  <th>Type</th>
			  <th>Value</th>
			</tr>
		  </thead>
		  <tbody>
			{table.map((row, index) => (
			  <tr key={index}>
				<td>
				  <input
					type="text"
					value={row.type}
					onChange={(e) => handleRowChange(index, 'type', e.target.value)} // Handle key input change
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
  
  export default Table;