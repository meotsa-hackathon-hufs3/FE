import { useContext, useEffect } from "react"
import { PageContext } from "../layouts/PageLayout"

export default function OptionPage() {
    // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
    const { setDisplayBackButton, setBackPage, setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);

    useEffect(() => {
        setDisplayBackButton(true);
        setNextButtonText('AI 모델 생성 요청하기');
    }, [])
    
    return (
        <>
        </>
    )
}