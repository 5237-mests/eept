import React, { useState } from 'react';
import axios from 'axios';

function FileUploadForm() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      setMessage('Please select a file and provide a title.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/files/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded successfully');
      console.log(response.data); // You can handle the API response here
    } catch (error) {
      setMessage('File upload failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Upload PDF File and Title</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="file">Select PDF File:</label>
          <input
            type="file"
            id="file"
            accept=".pdf"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Upload File'}
        </button>
        <p>{message}</p>
      </form>
    </div>
  );
}

export default FileUploadForm;
