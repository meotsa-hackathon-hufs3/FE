import './App.css'
import { createContext, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import ModelPage from './pages/ModelPage'
import ImagePage from './pages/ImagePage'
import axiosInstance from './api/axiosInstance'
import PageLayout from './layouts/PageLayout'
import OptionPage from './pages/OptionPage'
import PricingPage from './pages/PricingPage'
import UploadPage from './pages/UploadPage'

export const KeyContext = createContext();

function App() {
    const [key, setKey] = useState(null);

    return (
        <KeyContext value={{ key, setKey }}>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route element={<PageLayout />}>
                    <Route path='/upload/:creationId' element={<UploadPage />} />
                    <Route path='/image' element={<ImagePage />} />
                    <Route path='/option/:creationId' element={<OptionPage />} />
                    <Route path='/model/:creationId' element={<ModelPage />} />
                    <Route path='/pricing/:creationId' element={<PricingPage />} />
                </Route>
            </Routes>
        </KeyContext>
    )
}

export default App
