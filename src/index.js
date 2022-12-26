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



            <div>
                <div>
                    {data.map((item, index) => (
                        <div key={index} style={{ border: '1px solid black' }}>

                            {Object.keys(item).map((keyItems, i) => {
                                if (Object.values(item)[i]) { 
                                    return (
                                        <li key={index}>{JSON.stringify(Object.keys(item)[i])} : {JSON.stringify(Object.values(item)[i])}</li>
                                    )
                             }


                            })}

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


ReactDOM.render(<CSVReader />, document.getElementById('root'));
