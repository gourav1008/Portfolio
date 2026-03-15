import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WindowManagerProvider } from './context/WindowManager'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WindowManagerProvider>
      <App />
    </WindowManagerProvider>
  </React.StrictMode>,
)
