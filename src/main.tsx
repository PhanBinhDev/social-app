import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/toaster'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './providers/ThemeProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
      <App />
      <Toaster />
    </ThemeProvider>
  </StrictMode>
)
