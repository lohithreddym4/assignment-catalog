import React, { useEffect } from 'react';
import './Table.css';

const Table = ({ config, data, setData }) => {
  const [editLinkRow, setEditLinkRow] = React.useState(null);
  const[hasLink, setHasLink] = React.useState(false);

  const handleCellChange = (rowId, columnId, value) => {
    const updatedData = data.map(row =>
      row.id === rowId ? { ...row, [columnId]: value } : row
    );
    setData(updatedData);
  };

  useEffect(() => {
    if(config.length > 0){
      const hasLink = config.filter(col => col.type === 'Link').length > 0;
      setHasLink(hasLink);
    }
  }, [config]);
  

  return (
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
                  {editLinkRow === row.id ? <i className="fa-solid fa-check"></i> : 
                  <p>
                    <i className="fa fa-pencil" aria-hidden="true"></i> URL
                  </p>
                  
                  }
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
