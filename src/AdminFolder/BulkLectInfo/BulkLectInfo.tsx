import React, { useState, FormEventHandler, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import axios from 'axios';
import './index.scss';
import {BsUpload} from 'react-icons/bs';
import { file } from '../utilis/Types';

const url = 'http://localhost:5000/';

function BulkLectInfo() {
  const [file, setFile] = useState([{}] as file);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);


  const handleFileChange = (event:any) => {
    const file = event.target.files[0]
    setFile(file);
  };

  const handleSubmit = async (event: any, formData: FormData) => {
    event.preventDefault();
    formData.append('file', file);
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.status === 404){
        alert("Server Error");
      }

      if (response.data.success) {
        setSuccess(true);
        alert('File uploaded successfully');
        setIsLoading(true);
      } else {
        alert('An error occurred while uploading the file');
      }
    } catch (err) {
      setError(error);
    }
     
  };
  
  const handleUpload = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append('file', file);
  
    handleSubmit(event, formData);
  };
  
  return (
    <div className="container">
      <div>
        <h1>Bulk upload of lecturers information</h1>
      </div>
      <form onSubmit={handleUpload}>
        <div className='drop-file'>
          {Object.keys(file).length > 0 &&
           <p>{file.name}</p>}
          <label htmlFor="file">Upload lecturers information<span className='icon'><BsUpload /></span></label>
          <input type="file" id="file" onChange={handleFileChange} accept=".csv" />
          <button className='btn scan-btn' disabled={!file || isLoading}>
            {isLoading ? 'Uploading...' : 'Send'}
          </button>
        </div>
      </form>
      {success && (
        <div className="success-message">
          <p>File uploaded successfully!</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>An error occurred while uploading the file</p>
        </div>
      )}
    </div>
  );
}
export default BulkLectInfo;