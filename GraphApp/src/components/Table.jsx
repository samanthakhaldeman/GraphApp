import React, { useState, useEffect, useRef } from 'react';

const Table = ({ table, onTableChange, tableType }) => {
	const [rows, setRows] = useState([{ type: '', value: '' }]);
  
	useEffect(() => {
	  	setRows( table || [{ type: '', value: '' }]);
	}, [table]);
	
	const handleRowChange = (index, field, value) => {
		const updatedRows = [...table]; 
		updatedRows[index][field] = value; 
		setRows(updatedRows);
		onTableChange(tableType, updatedRows);
	};
  
	const handleAddRow = () => {
		setRows((prevRows) => {
			const updatedRows = [...prevRows, { type: '', value: '' }];
			onTableChange(tableType, updatedRows);
			return updatedRows; 
		});
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
			{rows.map((row, index) => (
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