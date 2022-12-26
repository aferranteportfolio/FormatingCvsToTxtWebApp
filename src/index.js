import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Papa from 'papaparse';



function CSVReader() {
    const [data, setData] = useState([]);
  
    const handleFileSelect = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const csvData = Papa.parse(event.target.result, {
          header: true,
          dynamicTyping: true,
        });
        setData(csvData.data);
      };
  
      reader.readAsText(file);
    };
  
    const handleDownload = () => {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: 'text/plain;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'data.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileSelect} />
        <button onClick={handleDownload}>Download</button>
        <table>
          <thead>
            <tr>
              {data.length > 0 &&
                Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {Object.values(row).map((value) => (
                  <td key={value}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  

ReactDOM.render(<CSVReader />, document.getElementById('root'));
