import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { gsapConfig } from '@/features/animations/gsap.config'

gsapConfig.init()

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
