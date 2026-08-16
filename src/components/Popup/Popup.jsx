import './Popup.css';
import warning from '../../assets/warning.png'
import smile from '../../assets/smile.png'

export default function Popup({visibility, mainText, subText, type, setError}) {

  return (
    <div style={visibility ? {display: "flex"} : {display: "none"}} className='popupBg'>
        <div className='popup'>
            <img src={type == 'warning' ? warning : smile} alt="icon" />
            <div>
                <p>{mainText}</p>
                <p style={{display: (subText ? 'block' : 'none')}}>{subText}</p>
            </div>
            <button onClick={() => setError(false)} className='buttonDefault'>확인</button>
        </div>
    </div>
  );
}