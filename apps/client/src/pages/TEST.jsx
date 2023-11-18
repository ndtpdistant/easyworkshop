import React, { useState } from 'react';
import { createItem } from '../services/apiItem';

const TEST = () => {
  const [files, setFiles] = useState([]);
  let formData = new FormData();
  formData.append('item_name', '3DBenchy');
  formData.append('about', '12321');

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleForm = (e) => {
    e.preventDefault(e);
    const authToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImVtYWlsIjoibWF0c3ZlaS5zaHVsbWFuQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoiaDEzcTE4OSIsImZpcnN0TmFtZSI6ItCc0LDRgtCy0LXQuSIsImxhc3ROYW1lIjoi0JzQsNGC0LLQtdC10LIiLCJpYXQiOjE3MDAyMTUzNjksImV4cCI6MTcwMDI1ODU2OX0.DBps4UmqO3nyupm6cs-YoPxXJ3dnC6A1bgyjRyqLWS4';
    createItem(formData, files, authToken);
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <input type="file" onChange={handleFileChange} multiple />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TEST;
