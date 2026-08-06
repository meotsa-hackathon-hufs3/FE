import axiosInstance from "../api/axiosInstance";
import { useContext, useState } from 'react';
import { LoginContext } from "../App";
import { Link } from "react-router";

export default function MainPage() {
  const { accessToken, setAccessToken, isLoggedIn, isLoading } = useContext(LoginContext);

  async function handleLogout() {
    try {
        const response = await axiosInstance.post(
            '/auth/logout',
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )

        setAccessToken(null);
        localStorage.clear();
    } catch (error) {
        console.log(error.response.data)
    }
  }

  if (isLoggedIn && isLoading) {
    return (
        <>
          loading...
        </>
    )
  }

  return (
    <>
      {
        isLoggedIn ?
        <div>
            Welcome!
            <button onClick={handleLogout}>Log out</button>
        </div> :
        <div>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </div>
      }
    </>
  )
}