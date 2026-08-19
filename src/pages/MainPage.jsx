import axiosInstance from "../api/axiosInstance";
import { useState } from 'react';
import { useNavigate } from "react-router";
import { Link } from "react-router";
import './MainPage.css'
import logo from '../assets/logo.png'
import next from '../assets/next.png'
import step1 from '../assets/step1.png'
import step2 from '../assets/step2.png'
import step3 from '../assets/step3.png'
import logo_main from '../assets/logo_main.png'
import background_dog from '../assets/background_dog.png'
import background_land from '../assets/background_land.png'
import background_mobile from '../assets/background_mobile.png'

export default function MainPage() {
  const navigate = useNavigate();

  async function handleStart() {
    try {
      const response = await axiosInstance.post(
        '/creations'
      )
    
      navigate(`/upload/${response.data.creationId}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main">
      <div className="mainScreen">
        <div>
          <img src={logo_main} alt="메인 로고" />
          <div className="topIntro">
            <div>
              <div>
                “반려동물의 모습을 나만의 굿즈로”
              </div>
              <div>
                AI가 사진 한 장 속 반려동물의 모습을 그대로 담아 3D로 되살려,<br />
                오래도록 곁에 두고 볼 수 있는 나만의 굿즈로 만들어드려요.
              </div>
            </div>
            <div>
              <div onClick={handleStart} className="buttonDefault startButton">
                굿즈 만들기
                <img src={next} alt="" />
              </div>
            </div>
          </div>
        </div>

        <img className="bg" src={background_land} alt="산 배경" />
        <img className="bg" src={background_dog} alt="강아지 배경" />
        <img className="bg mobileBg" src={background_mobile} alt="" />
      </div>
      
      <div className="content">
        <div>
          <div>
            <div>
              "소중한 반려동물의 모습을 오래 곁에 두고 싶다" 생각해본 적 있나요?
            </div>
            <div>
              복잡한 3D 제작, AI로 PETFORM이 해결해드릴게요.
            </div>
          </div>
          <div>
            <div>
              특별하게 남기고 싶은데, 방법을 몰라 미뤄두기만 했어요.😥
            </div>
            <div>
              막상 만들려고 하니 어디서부터 시작해야 할지 모르겠어요.
            </div>
            <div>
              3D 모델링을 배울 시간도, 자신도 없어요.
            </div>
          </div>
        </div>

        <div>
          <div>나만의 3D 굿즈, 이렇게 만들어져요</div>
          <div className="steps">
            <div className="step">
              STEP 1
            </div>
            <div className="line">
            </div>
            <div className="step">
              STEP 2
            </div>
            <div className="line">
            </div>
            <div className="step">
              STEP 3
            </div>
          </div>
          <div className="cards">
            <div className="card">
              <div className="step mobileStep">
                  STEP 1
                </div>
              <div>
                <div>실물 사진 업로드</div>
                <div>
                  반려동물의 모습이 잘 보이는 사진 한 장을 올려주세요
                </div>
              </div>
              <img src={step1} alt="" />
            </div>
            <div className="card">
              <div className="step mobileStep">
                STEP 2
              </div>
              <div>
                <div>AI 3D 이미지 변환</div>
                <div>
                  사진 속 특징을 분석해 입체적인 형태로 그려냅니다
                </div>
              </div>
              <img src={step2} alt="" />
            </div>
            <div className="card">
              <div className="step mobileStep">
                STEP 3
              </div>
              <div>
                <div>3D 모델 완성</div>
                <div>
                  완성된 모델을 확인하고, 원하는 굿즈로 제작을 진행해요
                </div>
              </div>
              <img src={step3} alt="" />
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer">
        <div>
          <img src={logo} alt="" />
          <div className="intro">
            <div>
              AI로 만드는 나만의 3D 굿즈
            </div>
            <div>
              아이디어에서 실물까지, 더 쉽고 빠르게.
            </div>
          </div>
          <div className="links">
            <Link to="/">서비스 소개</Link>
            <Link to="/">제작하기</Link>
            <Link to="/">제작 과정</Link>
            <Link to="/">FAQ</Link>
          </div>
        </div>
        <div>
          © 2026 [PETFORM]. All rights reserved.
        </div>
      </div>
    </div>
  )
}