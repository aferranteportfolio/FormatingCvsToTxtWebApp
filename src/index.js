import React from 'react';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import Papa from 'papaparse';
import 'bootstrap/dist/css/bootstrap.css'



function CSVReader() {
    debugger
    const [data, setData] = useState([]);

    const handleFileSelect = (event) => {
        // const file = event.target.files[0];
        const file = event.dataTransfer.files[0]
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

    const handleDragOVer = (event) => {
        event.preventDefault()
    }


    const handleDrop = (event) => {
        event.preventDefault()
        handleFileSelect(event)
    }


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
        <div class='text-center' style={{ height: "100%" }}>
            <div class='w-100 h-100 p-3'>
                <div class="bg-light p-5 rounded">
                    {!data[1] ? <h1><div className='btn btn-lg btn-primary'
                        onDragOver={handleDragOVer}
                        onDrop={handleDrop}
                    >
                        <h1>Drop Files Here</h1>
                        <h1>Or</h1>
                        <input type="file" onChange={handleFileSelect} />
                    </div></h1> : <div>
                        {data.map((item, index) => (
                            <div key={index} style={{ border: '1px solid black' }}>
                                {Object.keys(item).map((keyItems, i) => {
                                    if (Object.values(item)[i]) {
                                        return (
                                            <li key={index}>{JSON.stringify(Object.keys(item)[i]).replaceAll('"', "")} : {JSON.stringify(Object.values(item)[i]).replaceAll('"', "")}</li>
                                        )
                                    }
                                })}
                            </div>
                        ))}
                    </div>

                    }


                    {/* (!data.length[1]) && 
                            <div className='btn btn-lg btn-primary'
                            onDragOver={handleDragOVer}
                            onDrop={handleDrop}
                            >
                                <h1>Drop Files Here</h1>
                                <h1>Or</h1>
                                <input type="file" onChange={handleFileSelect}/>                           
                        </div> */}




                </div>

            </div>
            <div>
            </div>
        </div>);
}


ReactDOM.render(<CSVReader />, document.getElementById('root'));



// <button onClick={handleDownload}>Download</button>
{/* <div>
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
</div> */}



// <>
//             {!data && (
//                 <div>
//                     <h1>Drop Files Here</h1>
//                     <h1>Or</h1>
//                     <button>Upload</button>
//                 </div>)
//             }


//         </>