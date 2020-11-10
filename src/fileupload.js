import React, { useRef, useState } from 'react';
import axios from 'axios';

function FileUpload() {
    const [file, setFile] = useState(''); // storing the uploaded file    
    // storing the recived file from backend
    const [info, getFile] = useState({content: ""});    
    const [progress, setProgess] = useState(0); // progess bar
    const el = useRef(); // accesing input element

    const handleChange = (e) => {
        setProgess(0)
        const file = e.target.files[0]; // accesing file
        console.log("Trash info: ", file);
        setFile(file); // storing file
    }
    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.post('http://localhost:4500/upload', formData, {
            onUploadProgress: (ProgressEvent) => {
                let progress = Math.round(
                ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                setProgess(progress);
            }
        }).then(res => {
            console.log("What is it? ", res);
            getFile({ 
                     content: res.data.state
                   })
        }).catch(err => console.log(err))}

        if (info) {
            console.log("File info: ", info);
        }
        console.log("KAIF ", info.content);

    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} /> 
                  <div className="progessBar" style={{ width: progress }}>
                   {progress}
                </div>
                <button onClick={uploadFile} className="upbutton">                   
                Upload
                </button>
            </div>
        </div>
    );
}
export default FileUpload;