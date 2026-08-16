import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import axiosInstance from "../api/axiosInstance";
import Loading from "../components/Loading/Loading";
import { PageContext } from "../layouts/PageLayout";
import { KeyContext } from "../App";

export default function ImagePage() {
    // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
    const { setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);
    const { key, setStylizedImageUrl } = useContext(KeyContext);
    const { creationId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const regenerated = location.state?.regenerated;
    const prompt = location.state?.prompt;

    const [status, setStatus] = useState('loading');
    useEffect(() => {
        let cancelled = false;

        async function generateStylizedImage() {
            try {
                const response = await axiosInstance.post(`/creations/${creationId}/stylized-images`, {
                    originalImageKey: key,
                    prompt: prompt || undefined,
                });

                if (cancelled) return;
                setStylizedImageUrl(response.data.stylizedImageUrl);
                setStatus('complete');
            } catch (error) {
                console.log(error.response.data);
                if (!cancelled) setStatus('error');
            }
        }

        generateStylizedImage();
        return () => {
            cancelled = true;
        };
    }, [creationId]);

    useEffect(() => {
        setNextButtonText('결과 확인');
        setNextButtonActive(status === 'complete');
        setNextButtonOnclick(() => () => navigate(`/image/${creationId}/result`, { state: { regenerated } }));
    }, [status]);

    function handleErrorConfirm() {
        navigate('/upload');
    }

    return (
        <div className='loadingOnScreen'>
            <title>PETFORM: 이미지 생성 중</title>
            <Loading
                type={'image'}
                isComplete={status === 'complete'}
                error={status === 'error'}
                onConfirm={handleErrorConfirm}
            />
        </div>
    );
}
