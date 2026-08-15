import './UploadPage.css';
import axiosInstance from '../api/axiosInstance';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { PageContext } from '../layouts/PageLayout';
import { KeyContext } from '../App';
import fileIcon from '../assets/file.png';
import checkIcon from '../assets/check.png';
import errorIcon from '../assets/error.png';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png'];

export default function UploadPage() {
    // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
    const { setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);
    const { setKey, creationId, setCreationId } = useContext(KeyContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('idle'); // 'idle' | 'success' | 'error'
    const [isDragOver, setIsDragOver] = useState(false);
    const [prompt, setPrompt] = useState('');

    useEffect(() => {
        setNextButtonText('이미지 생성하기');
    }, []);

    useEffect(() => {
        setNextButtonActive(uploadStatus === 'success');
        setNextButtonOnclick(() => () => navigate('/image', { state: { prompt } }));
    }, [uploadStatus, prompt]);

    function openFilePicker() {
        fileInputRef.current?.click();
    }

    function handleBoxClick() {
        if (uploadStatus === 'idle') {
            openFilePicker();
        }
    }

    function processFile(selected) {
        if (!ACCEPTED_TYPES.includes(selected.type)) {
            setUploadStatus('error');
            return;
        }
        setFile(selected);
        handleUpload(selected);
    }

    function handleFileChange(e) {
        const selected = e.target.files[0];
        if (!selected) return;
        processFile(selected);
        e.target.value = '';
    }

    function handleDragOver(e) {
        e.preventDefault();
        if (uploadStatus === 'idle') {
            setIsDragOver(true);
        }
    }

    function handleDragLeave() {
        setIsDragOver(false);
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragOver(false);
        if (uploadStatus !== 'idle') return;

        const dropped = e.dataTransfer.files[0];
        if (!dropped) return;
        processFile(dropped);
    }

    async function handleUpload(selectedFile) {
        const type = selectedFile.name.split('.').pop();

        try {
            let currentCreationId = creationId;
            if (!currentCreationId) {
                const creationResponse = await axiosInstance.post('/creations');
                currentCreationId = creationResponse.data.creationId;
                setCreationId(currentCreationId);
            }

            // Presigned url
            const response = await axiosInstance.post('/files/presigned-upload', {
                creationId: currentCreationId,
                purpose: 'ORIGINAL_IMAGE',
                contentType: `image/${type}`,
            });
            const uploadUrl = response.data.uploadUrl;
            setKey(response.data.key);

            // Upload
            await axiosInstance.put(uploadUrl, selectedFile, {
                headers: {
                    'Content-Type': `image/${type}`,
                },
            });
            setUploadStatus('success');
        } catch (error) {
            console.log(error);
            setUploadStatus('error');
        }
    }

    return (
        <div className="uploadPage">
            <div className="uploadHeader">
                <p>사진을 업로드해주세요</p>
                <p>마음에 들지 않는 부분은 프롬프트를 수정해 다시 생성할 수 있어요.</p>
            </div>

            <input ref={fileInputRef} onChange={handleFileChange} type="file" accept="image/jpeg,image/png" hidden />

            <div
                className={'uploadBox ' + uploadStatus + (isDragOver ? ' dragOver' : '')}
                onClick={handleBoxClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {uploadStatus === 'idle' && (
                    <>
                        <img className="uploadIcon" src={fileIcon} alt="" />
                        <p>클릭하거나 파일을 끌어다 놓아주세요</p>
                        <p className="small">JPG, PNG · 최대 20MB</p>
                        <div
                            className="buttonDefault uploadActionButton"
                            onClick={(e) => {
                                e.stopPropagation();
                                openFilePicker();
                            }}
                        >
                            파일 선택
                        </div>
                    </>
                )}

                {uploadStatus === 'success' && (
                    <>
                        <img className="uploadIcon" src={checkIcon} alt="" />
                        <p>파일 업로드 완료</p>
                        <p className="fileName">{file?.name}</p>
                    </>
                )}

                {uploadStatus === 'error' && (
                    <div className="uploadErrorCard" onClick={(e) => e.stopPropagation()}>
                        <img className="uploadIcon" src={errorIcon} alt="" />
                        <p>파일 업로드 실패</p>
                        <p className="small">지원하지 않는 형식입니다 · JPG, PNG 형식의 파일을 선택해주세요</p>
                        <div className="buttonDefault uploadActionButton" onClick={() => setUploadStatus('idle')}>
                            확인
                        </div>
                    </div>
                )}
            </div>

            <p className="uploadTip">업로드 TIP - 얼굴 / 전신이 잘 보이는 정면 사진일수록 결과물 품질이 높아집니다</p>

            <div className="uploadPrompt">
                <label htmlFor="prompt">프롬프트</label>
                <textarea
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="예) 골든 리트리버, 정면을 바라보는 자세, 밝은 스튜디오 조명, 사실적인 사진 스타일..."
                />
            </div>
        </div>
    );
}
