import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import './ColumnConfig.css'

const ColumnConfig = ({ config, setConfig }) => {
  const [newColumnLabel, setNewColumnLabel] = useState('');
  const [newColumnType, setNewColumnType] = useState('Text');

  const addColumn = () => {
    const newColumn = {
      id: uuid(),
      label: newColumnLabel,
      type: newColumnType,
      options: newColumnType === 'Dropdown' ? ['Yes', 'No'] : null,
      width: 150,
    };
    setConfig([...config, newColumn]);
    setNewColumnLabel('');
  };

  const removeColumn = (id) => {
    setConfig(config.filter(col => col.id !== id));
  };

  return (
    <div>
      <h3>Column Configuration</h3>
      <input
        type="text"
        placeholder="Column Label"
        value={newColumnLabel}
        onChange={(e) => setNewColumnLabel(e.target.value)}
      />
      <select value={newColumnType} onChange={(e) => setNewColumnType(e.target.value)}>
        <option value="Text">Text</option>
        <option value="Link">Link</option>
        <option value="Checkbox">Checkbox</option>
        <option value="Dropdown">Dropdown</option>
      </select>
      <br />
      <button onClick={addColumn}
      disabled={!newColumnLabel}
      ><i class="fa-solid fa-plus"></i> Add Column</button>

      <ul style={{listStyle:'none'}}>
        {config.map(col => (
          <li key={col.id}>
            {col.label} ({col.type}) <button onClick={() => removeColumn(col.id)}><i className="fa-solid fa-trash"></i></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColumnConfig;
