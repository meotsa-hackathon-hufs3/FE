import './Loading.css';
import { useEffect, useState } from 'react';
import errorIcon from '../../assets/error.png'
import pawIcon from '../../assets/paw.png'
import paw1 from '../../assets/paw1.png'
import paw2 from '../../assets/paw2.png'
import paw3 from '../../assets/paw3.png'
import paw4 from '../../assets/paw4.png'

const pawFrames = [paw1, paw2, paw3, paw4];

export default function Loading({type, isComplete, error, onConfirm}) {
  // 이미지 로딩창은 'image', 모델 로딩창은 'model'을 type으로 보내면 됨
  // 결과 로딩 완료 시 isComplete를 true로 보내면 됨
  // 결과 생성 불가 시 error를 true로 보내면 됨

  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (isComplete || error) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % pawFrames.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isComplete, error]);

  return (
    <div className='loadingScreen'>
      {
      (!isComplete && !error) ?
      <>
        <div>
          <img className="loadingIcon" src={pawFrames[frameIndex]} alt="" />
        </div>
        <div>
          <p>AI가 3D {type == 'image' ? '이미지를' : '모델을'} 생성하고 있어요</p>
          <p>평균 소요시간 · {type == 'image' ? '1' : '1-3'}분</p>
        </div>
      </>:
      (
      !error ?
      <>
        <div>
          <img className="loadingIcon" src={pawIcon} alt="" />
        </div>
        <div>
          <p>{type == 'image' ? '이미지' : '3D 모델'} 생성 완료 !</p>
          <p>다음 화면에서 결과를 확인하세요</p>
        </div>
      </> :
      <>
        <div>
          <img className="loadingIcon" src={errorIcon} alt="" />
        </div>
        <div>
          <p>모델을 생성할 수 없습니다</p>
          <p>선택한 사진이 모델 생성에 적합하지 않거나 일시적인 오류가 발생했습니다.</p>
        </div>
        <div className='buttonDefault loadingButton' onClick={onConfirm}>확인</div>
      </>
      )
      }
    </div>
  );
}