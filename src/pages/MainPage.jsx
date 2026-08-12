import axiosInstance from "../api/axiosInstance";
import { useContext, useState } from 'react';
import { LoginContext } from "../App";
import { Link } from "react-router";
import LoginButton from "../components/LoginButton/LoginButton";

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
        <div>
            Welcome!
            <Link to="/file">File</Link>
        </div> :
        <div>
            <Link to="/register">Register</Link>
        </div>
      }
    </>
  )
}