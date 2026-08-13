import { useContext, useEffect } from "react";
import { PageContext } from "../layouts/PageLayout";

export default function PricingPage() {
    // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
    const { setDisplayBackButton, setBackPage, setNextButtonText, setNextButtonActive, setNextButtonOnclick } = useContext(PageContext);
    
    useEffect(() => {
        setDisplayBackButton(true);
        setNextButtonText('선택한 업체로 주문하기');
    }, [])

    return (
        <>
        </>
    )
}