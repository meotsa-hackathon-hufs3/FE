import './BackButton.css';
import axiosInstance from '../../api/axiosInstance';

export default function BackButton({onClick}) {
  // 클릭 시 발생할 함수는 onClick이라는 이름으로 넘기면 됨

  return (
    <div onClick={onClick} className='buttonDefault backButton'>
      이전
    </div>
  );
}