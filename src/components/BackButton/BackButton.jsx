import './BackButton.css';
import { useNavigate } from 'react-router';

export default function BackButton({url}) {
  // 클릭 시 이동할 링크를 url이라는 이름으로 넘기면 됨
  const navigate = useNavigate();

  function handleUrl() {
    navigate(url);
  }

  return (
    <button onClick={handleUrl} className='buttonDefault backButton'>
      이전
    </button>
  );
}