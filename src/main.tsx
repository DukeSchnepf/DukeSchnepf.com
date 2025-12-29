import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { gsapConfig } from '@/config/gsap.config'

// Initialize GSAP defaults and plugins once at startup
gsapConfig.init()

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
