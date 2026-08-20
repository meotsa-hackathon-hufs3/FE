import axiosInstance from "../api/axiosInstance";
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router";
import NextButton from "../components/NextButton/NextButton";
import { KeyContext } from "../App";
import { PageContext } from "../layouts/PageLayout";
import { STLLoader } from 'three/addons/loaders/STLLoader.js'
import { Canvas, useLoader } from '@react-three/fiber'
import { PCFShadowMap } from 'three';
import { Bounds, Center, OrbitControls, PerspectiveCamera } from '@react-three/drei' 
import './ModelPage.css'
import Loading from "../components/Loading/Loading";

function Model({url}) {
  const geom = useLoader(STLLoader, url);
  return (
    <mesh geometry={geom} castShadow receiveShadow>
      <meshStandardMaterial color="#b0b0b0" metalness={0} roughness={0.85} />
    </mesh>
  )
}

export default function ModelPage() {
  // 버튼 레이아웃 관련 부분 - 설명은 layouts/PageLayout.jsx 참고
  const { setBackPage, setNextButtonText, setNextButtonActive, setNextButtonOnclick, setNextButtonWhite } = useContext(PageContext);
  const { jobId } = useContext(KeyContext);
  const { creationId } = useParams();
 
  const [model, setModel] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function handleResult() {
    setIsLoading(false);
  }

  async function handleModel() {
    try {
      const response = await axiosInstance.get(
        `/creations/${creationId}/models/${jobId}`
      )

      if (response.data.status == "COMPLETED") {
        setModel(response.data);
        setNextButtonActive(true);
        setNextButtonOnclick(() => (handleResult));
      } else if (response.data.status == "FAILED") {
        setError(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setError(true);
    }
  }

  useEffect(() => {
    setBackPage(`/option/${creationId}`)
    setNextButtonWhite(false);

    if (!isLoading) {
      setNextButtonText('견적 비교하기');
      setNextButtonOnclick(() => handlePricing);
    } else {
      setNextButtonText('결과 확인');
    }

    if (!model && !error) {
      setNextButtonActive(false);
      const interval = setInterval(handleModel, 5000);
      return () => clearInterval(interval);
    }
  }, [model, error, isLoading])

  async function handleNewCreation() {
    try {
      const response = await axiosInstance.post(
        '/creations'
      )
    
      navigate(`/upload/${response.data.creationId}`);
    } catch (error) {
      console.log(error);
    }
  }

  function handlePricing() {
    navigate(`/pricing/${creationId}`);
  }

  function handleError() {
    navigate(`/image/${creationId}/result`)
  }

  if (!model || isLoading) {
    return (
      <div className="loadingOnScreen">
        <title>PETFORM: 모델 생성</title>
        <Loading type={'model'} isComplete={!error && model ? true : false} error={error ? true : false} onConfirm={error ? handleError : null} />
      </div>
    )
  }

  return (
    <div className="container modelPage">
      <title>PETFORM: 모델 확인</title>
      <div>
        <h1>모델을 확인해 보세요</h1>
        <p>드래그로 회전하고, 확대/축소로 세부를 확인할 수 있어요</p>
      </div>
      <div>
        <div className="model">
          <Canvas shadows={{ type: PCFShadowMap }} gl={{ alpha: true }} camera={{ position: [0, 0, 0], fov: 40 }}>
            <PerspectiveCamera 
              makeDefault 
              position={[0, -30, 0]} 
              fov={40} 
              up={[0, 0, 1]} 
            />
            <ambientLight intensity={0.6} />
            <directionalLight 
              position={[-5, -8, 5]} 
              intensity={1.8} 
              castShadow
              shadow-mapSize={[1024, 1024]}
            />
            <directionalLight 
              position={[6, -4, 3]} 
              intensity={0.7} 
            />
            <directionalLight 
              position={[0, -4, 8]} 
              intensity={0.4} 
            />
            <Bounds fit observe clip margin={1.5}>
              <Center>
                {
                  model &&
                  <Model url={model.modelUrl} />
                }
              </Center>
            </Bounds>
            <OrbitControls makeDefault enablePan={false} target={[0, 0, 0]} />
          </Canvas>
        </div>
        <div className="modelInfoContainer">
          <div className="modelInfo">
            <div>생성 품질</div>
            <div>
                <div className="info">
                  <div>구조 검사</div>
                  <div className={model?.widthCheck ? 'pass' : 'pass fail'}>{model ? (model.widthCheck ? '통과' : '주의') : '-'}</div>
                </div>
                <div className="info">
                  <div>두께 검사</div>
                  <div className={model?.widthCheck ? 'pass' : 'pass fail'}>{model ? (model.widthCheck ? '통과' : '주의') : '-'}</div>
                </div>
            </div>
          </div>
          <div className="modelInfo">
            <div>옵션 요약</div>
            <div>
                <div className="info">
                  <div>수량</div>
                  <div>{model ? model.amount + '개' : '-'}</div>
                </div>
                <div className="info">
                  <div>크기</div>
                  <div>{model ? model.size / 10 + 'cm' : '-'}</div>
                </div>
                <div className="info">
                  <div>소재</div>
                  <div>{model ? (model.material == 'PLA' ? 'PLA' : '레진') : '-'}</div>
                </div>
                <div className="info">
                  <div>색상</div>
                  <div>{model ? (model.color == 'MONO' ? '단색' : '풀컬러') : '-'}</div>
                </div>
                <div className="info priceInfo">
                  <div>예상 금액</div>
                  <div>약 {model ? model.expectedFee.toLocaleString() + '원' : '-'}</div>
                </div>
            </div>
          </div>
          <div>
            <NextButton white={true} onClick={handleNewCreation} text={'다른 사진으로 재생성'} isActive={true} />
          </div>
        </div>
      </div>
    </div>
  )
}