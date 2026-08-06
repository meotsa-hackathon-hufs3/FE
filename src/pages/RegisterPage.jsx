import axiosInstance from "../api/axiosInstance";
import { useContext, useState } from 'react';
import { LoginContext } from "../App";

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
      <button onClick={handleRegister}>Submit</button>
    </>
  )
}