import axiosInstance from "../api/axiosInstance";
import { useContext, useState } from 'react';
import Loading from "../components/Loading/Loading";
import { PageContext } from "../layouts/PageLayout";
import { KeyContext } from "../App";

export default function ImagePage() {
  // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
  const { setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);
  const { key } = useContext(KeyContext);

  const [uploadUrl, setUploadUrl] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState('');

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
      setDownloadUrl(response.data.fileUrl); // 이 url로 이미지 띄우기
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <Loading type={'image'} />
    </>
  )
}