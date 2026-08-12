import './LoginButton.css';
import { LoginContext } from '../../App';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import axiosInstance from '../../api/axiosInstance';

export default function LoginButton() {
  const { accessToken, setAccessToken, isLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();

  function handleLogin() {
    navigate('/login');
  }

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
        console.log(error)
    }
  }

  return (
    <div onClick={isLoggedIn ? handleLogout : handleLogin} className='buttonDefault loginButton'>
      {isLoggedIn ? 'Log Out' : 'Log In'}
    </div>
  );
}