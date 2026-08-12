import axiosInstance from "../api/axiosInstance";
import { useContext, useState } from 'react';
import { useNavigate } from "react-router";
import { LoginContext } from "../App";
import LongButton from "../components/LongButton/LongButton";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken } = useContext(LoginContext);
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const response = await axiosInstance.post(
        '/auth/login',
        {
          "username": username,
          "password": password
        }
      )

      setAccessToken(response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/");
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <>
      <label htmlFor="username">
        Username
        <input onChange={() => setUsername(event.target.value)} value={username} id="username" type="text" />
      </label>
      <label htmlFor="password">
        Password
        <input onChange={() => setPassword(event.target.value)} value={password} id="password" type="password" />
      </label>
      <LongButton isEmpty={!(username && password) ? true : false} onClick={handleLogin} text={'로그인'} />
    </>
  )
}