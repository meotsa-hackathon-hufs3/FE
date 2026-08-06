import './App.css'
import { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import axiosInstance from './api/axiosInstance'

export const LoginContext = createContext();

function App() {
    const [accessToken, setAccessToken] = useState(null);
    const isLoggedIn = !!accessToken;
    const [isLoading, setIsLoading] = useState(true);

    async function tryLogin() {
        try {
            const response = await axiosInstance.post(
                '/auth/reissue',
                {
                    "refreshToken": localStorage.getItem('refreshToken')
                }
            )
            setAccessToken(response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setIsLoading(false);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            tryLogin();
        }
    }, [])

    return (
        <LoginContext value={{ accessToken, setAccessToken, isLoggedIn, isLoading, setIsLoading }}>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/register' element={<RegisterPage /> } />
                <Route path='/login' element={<LoginPage />} />
            </Routes>
        </LoginContext>
    )
}

export default App
