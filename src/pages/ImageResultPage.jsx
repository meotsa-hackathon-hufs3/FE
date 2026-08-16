import './ImageResultPage.css';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { PageContext } from '../layouts/PageLayout';
import { KeyContext } from '../App';
import NextButton from '../components/NextButton/NextButton';
import expandIcon from '../assets/expand.png';
import closeIcon from '../assets/close.png';

export default function ImageResultPage() {
  const { setDisplayBackButton, setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);
  const { stylizedImageUrl } = useContext(KeyContext);
  const { creationId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const regenerated = location.state?.regenerated;

  const [prompt, setPrompt] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  function handleRegenerate() {
    navigate(`/image/${creationId}`, { state: { prompt, regenerated: true } });
  }

  function handleProceed() {
    navigate(`/option/${creationId}`);
  }

  useEffect(() => {
    setDisplayBackButton('none');
    setNextButtonText('굿즈 생성하기');
    setNextButtonActive(true);
    setNextButtonOnclick(() => handleProceed);
  }, []);

  return (
    <div className="container imageResultPage">
      <title>PETFORM: 이미지 생성 완료</title>
      <div>
        <h1>{regenerated ? '3D 이미지 재생성 완료' : '3D 이미지 생성 완료'}</h1>
        <p>마음에 들지 않는 부분은 프롬프트를 수정해 다시 생성할 수 있어요.</p>
      </div>

      <div className="imageResultBox">
        <img src={stylizedImageUrl} alt="생성된 이미지" onClick={() => setIsExpanded(true)} />
        <div className="expandButton" onClick={() => setIsExpanded(true)}>
          <img src={expandIcon} alt="" />
        </div>
      </div>

      <div className="uploadPrompt resultPrompt">
        <label htmlFor="resultPrompt">프롬프트 수정</label>
        <textarea
          id="resultPrompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="예) 골든 리트리버, 정면을 바라보는 자세, 밝은 스튜디오 조명, 사실적인 사진 스타일..."
        />
      </div>

      <div className="imageResultButtons">
        <NextButton text="이미지 재생성" isActive={true} white={true} onClick={handleRegenerate} />
      </div>

      {isExpanded && (
        <div className="imageModalOverlay" onClick={() => setIsExpanded(false)}>
          <div className="imageModal" onClick={(e) => e.stopPropagation()}>
            <div className="imageModalClose" onClick={() => setIsExpanded(false)}>
              <img src={closeIcon} alt="" />
            </div>
            <img src={stylizedImageUrl} alt="생성된 이미지 확대" />
          </div>
        </div>
      )}
    </div>
  );
}
