import React, { useState } from 'react';
import './TableConfig.css'

const TableConfigModal = ({ config, setConfig }) => {
  const [isOpen, setIsOpen] = useState(false);

  const rearrangeColumns = (sourceIndex, destinationIndex) => {
    const updatedConfig = [...config];
    const [movedItem] = updatedConfig.splice(sourceIndex, 1);
    updatedConfig.splice(destinationIndex, 0, movedItem);
    setConfig(updatedConfig);
  };

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}><i class="fa-solid fa-gear"></i> Configure Table </button>

      {isOpen && (
        <div className="modal">
          <h2>Table Configuration</h2>
          <ul>
            {config.map((col, index) => (
              <li key={col.id}>
                {col.label}
                <button
                  disabled={index === 0}
                  onClick={() => rearrangeColumns(index, index - 1)}
                >
                  <i class="fa-solid fa-up-long"></i>
                </button>
                <button
                  disabled={index === config.length - 1}
                  onClick={() => rearrangeColumns(index, index + 1)}
                >
                  <i class="fa-solid fa-down-long"></i>
                </button>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TableConfigModal;
