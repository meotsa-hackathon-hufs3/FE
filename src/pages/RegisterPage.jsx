import axiosInstance from "../api/axiosInstance";
import { useContext, useState } from 'react';
import { LoginContext } from "../App";
import LongButton from "../components/LongButton/LongButton";

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAccessToken } = useContext(LoginContext);

  async function handleRegister() {
    try {
      const response = await axiosInstance.post(
        '/auth/register',
        {
          "username": username,
          "password": password
        }
      )

      setAccessToken(response.data.accessToken);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      // 회원가입 후에 어떻게 할지?
    } catch (error) {
      console.log(error);
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
      <LongButton isEmpty={!(username && password) ? true : false} onClick={handleRegister} text={'가입하기'} />
    </>
  )
}