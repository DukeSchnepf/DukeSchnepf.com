import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect } from 'react'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import '@/styles/global.css'

const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App

