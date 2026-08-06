import axiosInstance from "./api/axiosInstance";
import { useState } from 'react';

export default function FilePage() {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [key, setKey] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload() {
    // Presigned url
    try {
      const response = await axiosInstance.post(
        '/files/presigned-upload',
        {
          "fileName": file.name,
          "contentType": 'model/stl'
        }
      )
      setUploadUrl(response.data.uploadUrl);
      setKey(response.data.key);
    } catch (error) {
      console.log(error);
    }

    // Upload
    try {
      const response = await axiosInstance.put(
        uploadUrl,
        file,
        {
          headers: {
            'Content-Type': 'model/stl'
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDownload() {
    try {
      const response = await axiosInstance.get(
        '/files/download-url',
        { params: {
            'key': key
          }
        }
      )
      setDownloadUrl(response.data.fileUrl);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <input onChange={handleFileChange} type="file" />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleDownload}>Download</button>
      <a href={downloadUrl}>Click me!</a>
    </>
  )
}