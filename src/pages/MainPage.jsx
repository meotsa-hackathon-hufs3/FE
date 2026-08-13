import axiosInstance from "../api/axiosInstance";
import { useContext, useState } from 'react';
import { LoginContext } from "../App";
import { Link } from "react-router";
import LoginButton from "../components/LoginButton/LoginButton";
import './MainPage.css'

export default function MainPage() {
  const { accessToken, setAccessToken, isLoggedIn, isLoading } = useContext(LoginContext);

  if (!isLoggedIn && isLoading) {
    return (
        <>
          loading...
        </>
    )
  }

  return (
    <>
      <LoginButton />
      {
        isLoggedIn ?
        <div className="main">
            Welcome!
            <Link to="/upload">업로드</Link>
            <Link to="/image">이미지 확인</Link>
            <Link to="/option">옵션 선택</Link>
            <Link to="/model">모델 확인</Link>
            <Link to="/pricing">견적 확인</Link>
        </div> :
        <div>
            <Link to="/register">Register</Link>
        </div>
      }
    </>
  )
}