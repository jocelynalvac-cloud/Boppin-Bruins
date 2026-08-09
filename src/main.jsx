import { StrictMode } from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LiveVisual from './LiveVisual.jsx'
import { PicoProvider } from './PicoContext.jsx'

//set up link with react dom
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PicoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/LiveVisual" element={<LiveVisual />} />
        </Routes>
      </BrowserRouter>
    </PicoProvider>
  </StrictMode>
)

