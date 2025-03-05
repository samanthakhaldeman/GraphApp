import React, { useState, useEffect } from 'react';

const Table = ({ table, onTableChange, tableType }) => {
  const [rows, setRows] = useState([{ type: '', value: '' }]);

  useEffect(() => {
    setRows(table || [{ type: '', value: '' }]);
  }, [table]);

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);
    onTableChange(tableType, updatedRows);
  };

  const handleAddRowBelow = (index) => {
    setRows((prevRows) => {
      const updatedRows = [
        ...prevRows.slice(0, index + 1),
        { type: '', value: '' },
        ...prevRows.slice(index + 1),
      ];
      onTableChange(tableType, updatedRows);
      return updatedRows;
    });
  };

  const handleRemoveRow = (index) => {
    setRows((prevRows) => {
      const updatedRows = prevRows.filter((_, i) => i !== index);
      onTableChange(tableType, updatedRows);
      return updatedRows;
    });
  };

  return (
    <div>
      <table border="0" cellPadding="3">
        <thead style={{ marginBottom: '5px' }}>
          <tr>
            <th>Type</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={row.type}
                  onChange={(e) =>
                    handleRowChange(index, 'type', e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.value}
                  onChange={(e) =>
                    handleRowChange(index, 'value', e.target.value)
                  }
                />
              </td>
              <td>
				<div className='row'>
					<button
						onClick={() => handleAddRowBelow(index)}
						className="plus-minus-button plus"
					>
						+
					</button>
					<button
						onClick={(event) => {
						  event.stopPropagation(); 
						  handleRemoveRow(index);
						}}
						className="plus-minus-button minus"
						disabled={rows.length === 1} 
					>
					-
					</button>
				</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
