import './NextButton.css';
import icon from '../../assets/next.png';
import icon_purple from '../../assets/next_purple.png';

export default function NextButton({ isActive, onClick, text, white }) {
    // 활성화 여부를 isActive라는 이름으로 넘기면 됨
    // 클릭 시 발생할 함수는 onClick이라는 이름으로 넘기면 됨
    // 버튼에 보일 텍스트를 text라는 이름으로 넘기면 됨
    // 흰 배경 버전 원할 시 white라는 이름으로 true를 넘기면 됨

    return (
        <div
            onClick={isActive ? onClick : null}
            className={
                'buttonDefault nextButton ' +
                (!isActive ? 'isInactive ' : ' ') +
                (isActive && white ? 'backButton' : '')
            }
        >
            {text}
            <img src={isActive && white ? icon_purple : icon} alt="" />
        </div>
    );
}
