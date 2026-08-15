import axiosInstance from "../api/axiosInstance";
import { useContext, useEffect, useState } from 'react';
import NextButton from "../components/NextButton/NextButton";
import BackButton from "../components/BackButton/BackButton";
import { PageContext } from "../layouts/PageLayout";

export default function ModelPage() {
  // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
  const { setNextButtonText, setNextButtonActive, setNextButtonOnclick, setNextButtonWhite } = useContext(PageContext);

  useEffect(() => {
    setNextButtonText('다른 사진으로 재생성');
    setNextButtonActive(true);
    setNextButtonWhite(true);
  }, [])
  
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState(null);
  const [key, setKey] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  // 모델 받아와야 해서 필요함!!! 이걸로 받아와서 띄우기
  // 키 어디서 받아올지 정해야함
  async function handleDownload() {
    try {
      const response = await axiosInstance.get(
        '/files/download-url',
        {
          params: {
            'key': key
          }
        }
      )
      setDownloadUrl(response.data.fileUrl);
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <button onClick={handleDownload}>Download</button>
    </>
  )
}