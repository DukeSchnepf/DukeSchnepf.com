import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Suspense, useState, useEffect, useRef, useCallback } from 'react';
import { CSSStarField } from './components/effects/CSSStarField';
import { LoadingScreen, LoadingScreenRef } from './components/features/LoadingScreen';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import './styles/global.css';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const loadingScreenRef = useRef<LoadingScreenRef>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Lock scroll during loading screen
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Always redirect to home and scroll to top on mount/refresh
  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    // Disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (location.pathname !== '/') {
      navigate('/', { replace: true });
    }
  }, []);

  // Handle loading complete with exit animation
  const handleLoadingComplete = useCallback(async () => {
    // Scroll to top before revealing content
    window.scrollTo(0, 0);

    // Trigger exit animation
    if (loadingScreenRef.current) {
      await loadingScreenRef.current.triggerExit();
    }

    // After exit animation completes, hide loading screen and show content
    setShowLoadingScreen(false);
    setIsLoading(false);
  }, []);

  return (
    <main className="bg-space-void min-h-screen text-white relative">
      {/* Starfield - always visible */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CSSStarField experienceStarted={!isLoading} />
      </div>

      {/* Loading Screen Overlay */}
      {showLoadingScreen && (
        <LoadingScreen ref={loadingScreenRef} onComplete={handleLoadingComplete} />
      )}

      {/* Main Content - hidden during loading */}
      <div className={`relative z-10 ${isLoading ? 'invisible' : 'visible'}`}>
        <Navigation />

        <Suspense fallback={<div className="flex h-screen items-center justify-center text-white">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage showContent={!isLoading} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
