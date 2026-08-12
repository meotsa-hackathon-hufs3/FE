import './LongButton.css';
import axiosInstance from '../../api/axiosInstance';

export default function LongButton({isEmpty, onClick, text}) {
  return (
    <div onClick={onClick} className={'buttonDefault loginButton longButton ' + (isEmpty ? 'isIncomplete' : '') }>
      {text}
    </div>
  );
}