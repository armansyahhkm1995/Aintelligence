import React from 'react'
import { ToastProvider } from './context/ToastContext'
import { AppProvider } from './context/AppContext'
import { AppLayout } from './components/layout/AppLayout'

export function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <AppLayout />
      </AppProvider>
    </ToastProvider>
  )
}

export default App
