import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Table from './Components/Table/Table';
import ColumnConfig from './Components/ColumnConfig/ColumnConfig.js';
import TableConfigModal from './Components/TableConfig/TableConfigModal.js';
import './App.css';

const App = () => {
  const initialConfig = JSON.parse(localStorage.getItem('tableConfig')) || [
    { id: uuid(), label: 'Name', type: 'Text', width: 150 },
    { id: uuid(), label: 'Portfolio', type: 'Link', width: 200 },
    { id: uuid(), label: 'Eligible', type: 'Checkbox', width: 100 },
    { id: uuid(), label: 'Status', type: 'Dropdown', options: ['Yes', 'No'], width: 150 }
  ];

  const initialData = JSON.parse(localStorage.getItem('tableData')) || [
    { id: uuid(), Name: 'Lohith', Portfolio: 'https://lohith-dev.netlify.app', Eligible: true, Status: 'Yes' },
  ];

  const [tableConfig, setTableConfig] = useState(initialConfig);
  const [tableData, setTableData] = useState(initialData);

  useEffect(() => {
    localStorage.setItem('tableConfig', JSON.stringify(tableConfig));
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableConfig, tableData]);
  const handleDownload = () => {
    const tableState = { config: tableConfig, data: tableData };
    const jsonState = JSON.stringify(tableState, null, 2);
    console.log(jsonState);

    const blob = new Blob([jsonState], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'table-state.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h1>Table</h1>
      <Table
        config={tableConfig}
        data={tableData}
        setData={setTableData}
      />
      <ColumnConfig config={tableConfig} setConfig={setTableConfig} />
      <div className='d-flex-full'>
        <div className='d-flex'>
          <TableConfigModal config={tableConfig} setConfig={setTableConfig} />
          <br />
          <button onClick={handleDownload}>Download JSON <i class="fa-solid fa-download"></i></button>
        </div>
      </div>
    </div>
  );
};

export default App;
