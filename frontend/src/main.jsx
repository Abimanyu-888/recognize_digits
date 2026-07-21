import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from './App/app.jsx'

createRoot(document.getElementById('root')).render(//finds div with root id in index.html
    <StrictMode>
        <App />
    </StrictMode>
)