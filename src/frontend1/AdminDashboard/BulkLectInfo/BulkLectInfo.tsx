import React, { useState } from 'react';
import axios from 'axios';
import './index.scss';

function BulkLectInfo() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event:any) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (formData:any) => {
    try {
      const response = await axios.post('/api/teachers/bulk', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert('File uploaded successfully');
      } else {
        alert('An error occurred while uploading the file');
      }
    } catch (err) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = () => {
    if (!file) {
      alert('Please select a file to upload');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    handleSubmit(formData);
  };

  return (
    <div className="container">
        <div>
<h1>Bulk upload of lecturers information</h1>
        </div>
      
      <div className='drop-file'>
        <label htmlFor="file">Select a CSV file:</label>
        <input type="file" id="file" onChange={handleFileChange} />
      </div>
      <button className='btn scan-btn' onClick={handleUpload} disabled={!file || isLoading}>
        {isLoading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}
export default BulkLectInfo;