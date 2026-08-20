import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router'
import MainPage from './pages/MainPage'
import ModelPage from './pages/ModelPage'
import ImagePage from './pages/ImagePage'
import ImageResultPage from './pages/ImageResultPage'
import PageLayout from './layouts/PageLayout'
import OptionPage from './pages/OptionPage'
import PricingPage from './pages/PricingPage'
import UploadPage from './pages/UploadPage'
import { KeyContext } from './context/KeyContext'

function App() {
    const [key, setKey] = useState(null);
    const [stylizedImageUrl, setStylizedImageUrl] = useState(null);
    const [jobId, setJobId] = useState(null);

    return (
        <KeyContext value={{ key, setKey, jobId, setJobId, stylizedImageUrl, setStylizedImageUrl }}>
            <title>PETFORM</title>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route element={<PageLayout />}>
                    <Route path='/upload/:creationId' element={<UploadPage />} />
                    <Route path='/image/:creationId' element={<ImagePage />} />
                    <Route path='/image/:creationId/result' element={<ImageResultPage />} />
                    <Route path='/option/:creationId' element={<OptionPage />} />
                    <Route path='/model/:creationId' element={<ModelPage />} />
                    <Route path='/pricing/:creationId' element={<PricingPage />} />
                </Route>
            </Routes>
        </KeyContext>
    )
}

export default App
