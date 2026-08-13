import { Outlet } from "react-router";
import './PageLayout.css';
import logo from '../assets/logo.png'
import LoginButton from "../components/LoginButton/LoginButton";
import BackButton from "../components/BackButton/BackButton";
import NextButton from "../components/NextButton/NextButton";
import { createContext, useState } from "react";

export const PageContext = createContext();

export default function PageLayout() {
    // 전부 사용 시 useEffect 내에서 사용할 것
    const [displayBackButton, setDisplayBackButton] = useState('none'); // 이전 버튼 표시 여부 설정
    const [backPage, setBackPage] = useState(''); // 이전 버튼 누르면 가는 링크 설정
    const [nextButtonText, setNextButtonText] = useState(''); // 다음 버튼 텍스트 설정
    const [nextButtonActive, setNextButtonActive] = useState(false); // 다음 버튼 활성화 여부 설정
    const [nextButtonOnclick, setNextButtonOnclick] = useState(null); // 다음 버튼 누르면 실행할 함수 설정
    const [nextButtonWhite, setNextButtonWhite] = useState(false); // 다음 버튼 배경 색상 설정

    return (
        <PageContext value={{ setDisplayBackButton, setBackPage, setNextButtonText, setNextButtonActive, setNextButtonOnclick, setNextButtonWhite }}>
            <div className="pageLayout">
                <div className="pageLayoutBar">
                    <img src={logo} alt="" />
                </div>
                <div className="pageContent">
                    <Outlet />
                </div>
                <div className={"pageBottom " + (displayBackButton == 'none' ? 'noBackButton' : '')}>
                    <BackButton display={displayBackButton} url={backPage} />
                    <NextButton isActive={nextButtonActive} onClick={nextButtonOnclick} text={nextButtonText} white={nextButtonWhite} />
                </div>
            </div>
        </PageContext>
    )
}