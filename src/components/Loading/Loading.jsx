import './Loading.css';
import errorIcon from '../../assets/error.png'
import pawIcon from '../../assets/paw.png'

export default function Loading({type, isComplete, error}) {
  // 이미지 로딩창은 'image', 모델 로딩창은 'model'을 type으로 보내면 됨
  // 결과 로딩 완료 시 isComplete를 true로 보내면 됨
  // 결과 생성 불가 시 error를 true로 보내면 됨

  return (
    <div className='loadingScreen'>
      {
      (!isComplete && !error) ?
      <>
        <div>
          {/* 피그마 보고 발바닥 애니메이션 여기 넣어주세요 */}
        </div>
        <div>
          <p>AI가 3D {type == 'image' ? '이미지를' : '모델을'} 생성하고 있어요</p>
          <p>평균 소요시간 · {type == 'image' ? '2-3' : '1-3'}분</p>
        </div>
      </>:
      (
      !error ?
      <>
        <div>
          <img src={pawIcon} alt="" />
        </div>
        <div>
          <p>{type == 'image' ? '이미지' : '3D 모델'} 생성 완료 !</p>
          <p>다음 화면에서 결과를 확인하세요</p>
        </div>
      </> :
      <>
        <div>
          <img src={errorIcon} alt="" />
        </div>
        <div>
          <p>모델을 생성할 수 없습니다</p>
          <p>선택한 사진이 모델 생성에 적합하지 않거나 일시적인 오류가 발생했습니다.</p>
        </div>
        <div className='buttonDefault loadingButton'>확인</div>
      </>
      )
      }
    </div>
  );
}