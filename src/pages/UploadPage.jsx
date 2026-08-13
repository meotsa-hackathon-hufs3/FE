import axiosInstance from "../api/axiosInstance";
import { useContext, useEffect, useState } from 'react';
import { PageContext } from "../layouts/PageLayout";
import { LoginContext } from "../App";

export default function UploadPage() {
  // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
  const { setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);
  const { setKey } = useContext(LoginContext);

  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    setNextButtonText('이미지 생성하기');
  })

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleUpload() {
    const type = file.name.split('.')[1]

    // Presigned url
    try {
      const response = await axiosInstance.post(
        '/files/presigned-upload',
        {
          "fileName": file.name,
          "contentType": `image/${type}`
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
            'Content-Type': `image/${type}`
          }
        }
      )
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <input onChange={handleFileChange} type="file" />
      <button onClick={handleUpload}>Upload</button>
    </>
  )
}