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
    const [creationId, setCreationId] = useState(null);
    const [stylizedImageUrl, setStylizedImageUrl] = useState(null);

    return (
        <KeyContext value={{ key, setKey, creationId, setCreationId, stylizedImageUrl, setStylizedImageUrl }}>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route element={<PageLayout />}>
                    <Route path='/upload' element={<UploadPage />} />
                    <Route path='/image' element={<ImagePage />} />
                    <Route path='/option' element={<OptionPage />} />
                    <Route path='/model' element={<ModelPage />} />
                    <Route path='/pricing' element={<PricingPage />} />
                </Route>
            </Routes>
        </KeyContext>
    )
}

export default App
