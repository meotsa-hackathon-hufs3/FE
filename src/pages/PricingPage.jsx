import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { PageContext } from "../layouts/PageLayout";
import './PricingPage.css'
import Popup from "../components/Popup/Popup";
import axiosInstance from "../api/axiosInstance";

export default function PricingPage() {
    // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
    const { setDisplayBackButton, setBackPage, setNextButtonText, setNextButtonActive, setNextButtonOnclick, setNextButtonWhite } = useContext(PageContext);
    const { creationId } = useParams();
    const [ selected, setSelected ] = useState('');
    const [ end, setEnd ] = useState(false);
    const [ pricings, setPricings ] = useState([]);

    function handleEnd() {
        setEnd(true);
    }

    async function handlePricing() {
        try {
            const response = await axiosInstance.get(
                `/creations/${creationId}/estimates`
            )
            setPricings(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        handlePricing();

        setDisplayBackButton(true);
        setNextButtonWhite(false);
        setNextButtonActive(false);
        setNextButtonText('선택한 업체로 주문하기');
        setBackPage(`/model/${creationId}`);

        if (selected) {
            setNextButtonOnclick(() => handleEnd);
            setNextButtonActive(true);
        }
    }, [selected])

    return (
        <>
            <Popup setError={setEnd} visibility={end} mainText={'감사합니다'} type={'smile'} />
            <div className="container pricingPage">
                <div>
                    <h1>출력 업체별 견적을 비교하세요</h1>
                    <p>동일한 모델 · 옵션 기준, 업체별 가격· 소재· 납기를 비교할 수 있어요</p>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">소재 / 공정</th>
                            <th scope="col">예상 기간</th>
                            <th scope="col">최소 수량</th>
                            <th scope="col">제작 비용</th>
                            <th scope="col">배송비</th>
                            <th scope="col">예상 합계</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pricings.map((pricing) => {
                                return (
                                    <tr key={pricings.indexOf(pricing)}>
                                        <th className="company" scope="row">
                                            <div>{pricing.name}</div>
                                            <div>{pricing.tag}</div>
                                        </th>
                                        <td>{pricing.material} · {pricing.process}</td>
                                        <td>{pricing.expectedTime}</td>
                                        <td>{pricing.minQuantity}개</td>
                                        <td>{pricing.printingCost.toLocaleString()}원</td>
                                        <td>{pricing.shippingCost.toLocaleString()}원</td>
                                        <td>{pricing.totalCost.toLocaleString()}원</td>
                                        <td><button onClick={() => setSelected(pricing.printShopId)} className={"buttonDefault " + (selected == pricing.printShopId ? '' : 'backButton')}>{ selected == pricing.printShopId ? '선택됨' : '선택'}</button></td>
                                    </tr>
                                )
                        })
                        }
                    </tbody>
                </table>
                <div className="priceNote">
                    <div>
                        선택한 업체 기준으로 결제 화면에서 배송지·결제수단을 입력합니다.
                    </div>
                </div>
            </div>
        </>
    )
}