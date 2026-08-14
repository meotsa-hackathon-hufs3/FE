import { useContext, useEffect } from "react"
import { PageContext } from "../layouts/PageLayout"
import './OptionPage.css'
import option1 from '../assets/option1.png'
import option2 from '../assets/option2.png'
import option3 from '../assets/option3.png'

export default function OptionPage() {
    // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
    const { setDisplayBackButton, setBackPage, setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);

    useEffect(() => {
        setDisplayBackButton(true);
        setNextButtonText('AI 모델 생성 요청하기');
    }, [])
    
    return (
        <div className="container optionPage">
            <div>
                <h1>어떤 굿즈로 만들까요?</h1>
                <p>굿즈 종류와 옵션을 선택하면 예상 견적을 미리 확인할 수 있어요</p>
            </div>
            <div>
                <div className="options">
                    <div>
                        <p>피규어</p>
                        <img src={option1} alt="" />
                    </div>
                    <div>
                        <p>키링</p>
                        <img src={option2} alt="" />
                    </div>
                    <div>
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
                            <select name="" id="">
                                {
                                    [1, 2, 3, 4, 5].map((i) => {
                                        return <option>{i}개</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="setting">
                            <div>
                                크기 <span>*가로, 세로, 높이 중 최대 길이 기준</span>
                            </div>
                            <select name="" id="">
                                <option value="">5cm</option>
                                <option value="">8cm</option>
                            </select>
                        </div>
                        <div className="setting">
                            <div>
                                소재
                            </div>
                            <div>
                                <button>PLA</button>
                                <button>레진</button>
                            </div>
                        </div>
                        <div className="setting">
                            <div>
                                색상
                            </div>
                            <div>
                                <button>단색</button>
                                <button>풀컬러</button>
                            </div>
                        </div>
                    </div>
                    <div className="summary">
                        <div>선택 요약</div>
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    )
}