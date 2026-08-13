import './App.css'
import { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import ModelPage from './pages/ModelPage'
import ImagePage from './pages/ImagePage'
import axiosInstance from './api/axiosInstance'
import LoginLayout from './layouts/LoginLayout'
import PageLayout from './layouts/PageLayout'
import OptionPage from './pages/OptionPage'
import PricingPage from './pages/PricingPage'
import UploadPage from './pages/UploadPage'

export const LoginContext = createContext();

function App() {
    const [accessToken, setAccessToken] = useState(null);
    const isLoggedIn = !!accessToken;
    const [isLoading, setIsLoading] = useState(true);
    const [key, setKey] = useState(null);

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
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!isLoggedIn) {
            tryLogin();
        }
    }, [])

    return (
        <LoginContext value={{ accessToken, setAccessToken, isLoggedIn, isLoading, setIsLoading, key, setKey }}>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route element={<LoginLayout />}>
                    <Route path='/register' element={<RegisterPage /> } />
                    <Route path='/login' element={<LoginPage />} />
                </Route>
                <Route element={<PageLayout />}>
                    <Route path='/upload' element={<UploadPage />} />
                    <Route path='/image' element={<ImagePage />} />
                    <Route path='/option' element={<OptionPage />} />
                    <Route path='/model' element={<ModelPage />} />
                    <Route path='/pricing' element={<PricingPage />} />
                </Route>
            </Routes>
        </LoginContext>
    )
}

export default App
