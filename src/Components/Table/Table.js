import React, { useState } from 'react';
import './Table.css';

const Table = ({ config, data, setData }) => {
  const [editLinkRow, setEditLinkRow] = useState(null);

  const handleCellChange = (rowId, columnId, value) => {
    const updatedData = data.map(row =>
      row.id === rowId ? { ...row, [columnId]: value } : row
    );
    setData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = { id: Date.now() }; // Unique ID for the new row
    config.forEach(col => {
      newRow[col.label] = col.type === 'Checkbox' ? false : ''; // Initialize based on column type
    });
    setData([...data, newRow]); // Add the new row to the existing data
  };

  const hasLink = data.some(row =>
    config.some(col => col.type === 'Link' && row[col.label])
  );

  return (
    <div>
      <table border="1">
        <thead>
          {config.length > 0 && (
            <tr>
              {config.map(col => <th key={col.id}>{col.label}</th>)}
              {hasLink && <th>Action</th>}
            </tr>
          )}
        </thead>
        <tbody>
          {data.map(row => (
            <tr key={row.id}>
              {config.map(col => (
                <td key={col.id}>
                  {col.type === 'Text' && (
                    <input
                      type="text"
                      value={row[col.label]}
                      onChange={(e) => handleCellChange(row.id, col.label, e.target.value)}
                    />
                  )}
                  {col.type === 'Link' && (
                    <>
                      {editLinkRow === row.id ? (
                        <input
                          type="text"
                          value={row[col.label]}
                          onChange={(e) => handleCellChange(row.id, col.label, e.target.value)}
                        />
                      ) : (
                        <a href={row[col.label]} target='_blank' rel="noopener noreferrer">{row[col.label]}</a>
                      )}
                    </>
                  )}
                  {col.type === 'Checkbox' && (
                    <input
                      type="checkbox"
                      checked={row[col.label]}
                      onChange={(e) => handleCellChange(row.id, col.label, e.target.checked)}
                    />
                  )}
                  {col.type === 'Dropdown' && (
                    <select
                      value={row[col.label]}
                      onChange={(e) => handleCellChange(row.id, col.label, e.target.value)}
                    >
                      {col.options.map(option => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}
                </td>
              ))}
              {hasLink && (
                <td>
                  <button onClick={() => setEditLinkRow(editLinkRow === row.id ? null : row.id)}>
                    {editLinkRow === row.id ? <i className="fa-solid fa-check"></i> : <i className="fa fa-pencil" aria-hidden="true"></i>}
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-row-btn" onClick={handleAddRow}>Add Row</button>

    </div>
  );
};

export default Table;
