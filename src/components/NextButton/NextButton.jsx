import './NextButton.css';
import icon from '../../assets/next.png'
import axiosInstance from '../../api/axiosInstance';

export default function NextButton({isIncomplete, onClick, text}) {
  // 사용자 입력이 완전한지 아닌지 여부를 isIncomplete이라는 이름으로 넘기면 됨
  // 클릭 시 발생할 함수는 onClick이라는 이름으로 넘기면 됨
  // 버튼에 보일 텍스트를 text라는 이름으로 넘기면 됨

  return (
    <div onClick={onClick} className={'buttonDefault nextButton ' + (isIncomplete ? 'isIncomplete' : '') }>
      {text}
      <img src={icon} alt="" />
    </div>
  );
}