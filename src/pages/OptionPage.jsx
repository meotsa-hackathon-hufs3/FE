import { useContext, useEffect, useState } from "react"
import { PageContext } from "../layouts/PageLayout"
import './OptionPage.css'
import option1 from '../assets/option1.png'
import option2 from '../assets/option2.png'
import option3 from '../assets/option3.png'
import Popup from "../components/Popup/Popup"

export default function OptionPage() {
    // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
    const { setDisplayBackButton, setBackPage, setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);

    const [selectedOption, setSelectedOption] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState(5);
    const [material, setMaterial] = useState(null);
    const [colour, setColour] = useState(null);
    const isValid = selectedOption && quantity && size && material && colour;
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isValid) {
            setNextButtonActive(true);
        }
        
        setDisplayBackButton(true);
        setNextButtonText('AI 모델 생성 요청하기');
    }, [isValid])

    function handleSelectedOption(option) {
        if (option == 'KEYRING' || option == 'DIORAMA') {
            setError(true);
            return;
        }
        setSelectedOption(option);
    }

    function handleQuantity(e) {
        setQuantity(e.target.value);
    }

    function handleSize(e) {
        // 백에 보낼 때 단위 변환!
        setSize(e.target.value);
    }
    
    function handleMaterial(m) {
        if (m == 'RESIN') {
            setError(true);
            return;
        }
        setMaterial(m);
    }

    function handleColour(c) {
        if (c == 'FULL') {
            setError(true);
            return;
        }
        setColour(c);
    }
    
    return (
        <>
            <Popup setError={setError} visibility={error} mainText={'구현 예정인 기능입니다'} subText={'해당 기능은 추후 업데이트될 예정입니다.'} type={'warning'} />
            <div className="container optionPage">
                <div>
                    <h1>어떤 굿즈로 만들까요?</h1>
                    <p>굿즈 종류와 옵션을 선택하면 예상 견적을 미리 확인할 수 있어요</p>
                </div>
                <div>
                    <div className="options">
                        <div className={selectedOption == 'FIGURE' ? 'selectedOption' : ''} onClick={() => handleSelectedOption('FIGURE')}>
                            <p>피규어</p>
                            <img src={option1} alt="" />
                        </div>
                        <div className={selectedOption == 'KEYRING' ? 'selectedOption' : ''} onClick={() => handleSelectedOption('KEYRING')}>
                            <p>키링</p>
                            <img src={option2} alt="" />
                        </div>
                        <div className={selectedOption == 'DIORAMA' ? 'selectedOption' : ''} onClick={() => handleSelectedOption('DIORAMA')}>
                            <p>디오라마</p>
                            <img src={option3} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="settings">
                            <div className="setting">
                                <div>
                                    수량
                                </div>
                                <select onChange={handleQuantity}>
                                    {
                                        [1, 2, 3, 4, 5].map((i) => {
                                            return <option value={i}>{i}개</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className="setting">
                                <div id="commentedSetting">
                                    크기 <span>*가로, 세로, 높이 중 최대 길이 기준</span>
                                </div>
                                <select onChange={handleSize}>
                                    <option value="5">5cm</option>
                                    <option value="8">8cm</option>
                                </select>
                            </div>
                            <div className="setting">
                                <div>
                                    소재
                                </div>
                                <div>
                                    <button className={material == 'PLA' ? 'selectedButton' : ''} onClick={() => handleMaterial("PLA")}>PLA</button>
                                    <button className={material == 'RESIN' ? 'selectedButton' : ''} onClick={() => handleMaterial("RESIN")}>레진</button>
                                </div>
                            </div>
                            <div className="setting">
                                <div>
                                    색상
                                </div>
                                <div>
                                    <button className={colour == 'MONO' ? 'selectedButton' : ''} onClick={() => handleColour("MONO")}>단색</button>
                                    <button className={colour == 'FULL' ? 'selectedButton' : ''} onClick={() => handleColour("FULL")}>풀컬러</button>
                                </div>
                            </div>
                        </div>
                        <div className="summarise">
                            <div>선택 요약</div>
                            <div className="summary">
                                <div>굿즈 종류</div>
                                <div>{selectedOption ? selectedOption : '-'}</div>
                            </div>
                            <div className="summary">
                                <div>수량</div>
                                <div>{quantity}개</div>
                            </div>
                            <div className="summary">
                                <div>크기</div>
                                <div>{size}cm</div>
                            </div>
                            <div className="summary">
                                <div>소재</div>
                                <div>{material ? material : '-'}</div>
                            </div>
                            <div className="summary">
                                <div>색상</div>
                                <div>{colour ? colour : '-'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}