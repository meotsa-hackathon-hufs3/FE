import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import axiosInstance from '../api/axiosInstance';
import Loading from '../components/Loading/Loading';
import { PageContext } from '../layouts/PageLayout';
import { KeyContext } from '../App';

export default function ImagePage() {
    const { setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);
    const { key, creationId, setStylizedImageUrl } = useContext(KeyContext);
    const navigate = useNavigate();
    const location = useLocation();
    const prompt = location.state?.prompt;
    const regenerated = location.state?.regenerated;

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
                console.log(error);
                if (!cancelled) setStatus('error');
            }
        }

        generateStylizedImage();
        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        setNextButtonText('결과 확인');
        setNextButtonActive(status === 'complete');
        setNextButtonOnclick(() => () => navigate('/image/result', { state: { regenerated } }));
    }, [status]);

    function handleErrorConfirm() {
        navigate('/upload');
    }

    return (
        <Loading
            type={'image'}
            isComplete={status === 'complete'}
            error={status === 'error'}
            onConfirm={handleErrorConfirm}
        />
    );
}
