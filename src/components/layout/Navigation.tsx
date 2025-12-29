import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { siteConfig } from '@/config/site.config'
import { smoothScrollTo } from '@/utils/helpers'
import { GearIcon } from '@/components/features/mechanical/MechanicalAssets'
import gsap from 'gsap'

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuContainerRef = useRef<HTMLDivElement | null>(null)
  const beltRef = useRef<HTMLDivElement | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // Oracle State
  const [showOracle, setShowOracle] = useState(false);
  const [oracleWisdom, setOracleWisdom] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);

  const handleNavClick = (href: string) => {
    const sectionId = href.replace('#', '')
    smoothScrollTo(sectionId)
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    if (showOracle) {
      setShowOracle(false);
      setIsMenuOpen(false);
      setOracleWisdom('');
    } else {
      setIsMenuOpen(!isMenuOpen)
    }
  }

  const consultOracle = async () => {
    setIsThinking(true);
    setOracleWisdom('');
    setTypingIndex(0);

    const apiKey = "";
    const prompt = "You are the Infinity Oracle. Give a short, cryptic, but inspiring piece of wisdom about digital destiny. Keep it under 20 words.";

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
      });

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "The void is silent.";

      setOracleWisdom(text);

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 0.5;
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error("Oracle disconnected:", error);
      setOracleWisdom("Connection to the ether failed.");
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (oracleWisdom && typingIndex < oracleWisdom.length) {
      const timeout = setTimeout(() => {
        setTypingIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [oracleWisdom, typingIndex]);

  // Build GSAP timeline for container only
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!menuContainerRef.current) return

      tlRef.current = gsap
        .timeline({ paused: true })
        .to(menuContainerRef.current, {
          height: '100vh',
          duration: 0.8,
          ease: 'power4.inOut'
        })
    })

    return () => ctx.revert()
  }, [])

  // Play / reverse on open change
  useEffect(() => {
    if (!tlRef.current) return
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      tlRef.current.play()
    } else {
      tlRef.current.reverse()
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const fullTracePath = "M 35.9,35.9 C 10,35.9 10,64.1 35.9,64.1 L 64.1,35.9 C 90,35.9 90,64.1 64.1,64.1 L 35.9,35.9 Z";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-transparent shadow-none pointer-events-none"
      style={{ background: 'transparent', boxShadow: 'none' }}
    >
      <div className="relative">
        {/* Top Bar (Always Visible) */}
        <div
          className="relative z-50 bg-transparent shadow-none h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 pointer-events-none"
          style={{ background: 'transparent', boxShadow: 'none' }}
        >

          {/* Logo Area */}
          <div className="flex items-center gap-3 group pointer-events-auto">
            <GearIcon className="w-8 h-8 text-neon-blue animate-spin-slow group-hover:text-neon-purple transition-colors duration-500" />
            <button
              onClick={() => handleNavClick('#home')}
              className="text-2xl font-bold text-white tracking-widest uppercase font-display hover:text-neon-blue transition-colors"
              style={{ textShadow: '0 0 15px rgba(56, 189, 248, 0.3)' }}
            >
            </button>
          </div>

          {/* Infinity Toggle Button */}
          <div className="relative flex justify-center items-center pointer-events-auto">
            <button
              onClick={toggleMenu}
              className={`group relative z-50 w-24 h-24 flex items-center justify-center focus:outline-none transition-all duration-500 ${isThinking ? 'animate-pulse-fast' : ''}`}
              aria-label="Toggle Menu"
            >
              <svg width="0" height="0">
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </svg>

              <svg
                width="80"
                height="80"
                viewBox="0 0 100 100"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="6"
                className="overflow-visible group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] group-active:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] transition-all duration-300"
              >
                {/* OUTER LOOPS + DOTS */}
                <g className={isMenuOpen || showOracle ? "block" : "hidden"} style={{ filter: 'url(#glow)' }}>

                  {/* Visual Paths - Static White Lines */}
                  <path
                    d="M 64.1,35.9 C 90,35.9 90,64.1 64.1,64.1"
                    stroke="white"
                    fill="none"
                    strokeDasharray="120"
                    strokeDashoffset="120"
                    className={isThinking ? "animate-spin" : "animate-draw-loop"}
                    style={isThinking ? { transformOrigin: 'center', animationDuration: '1s' } : { animationDelay: '-2s' }}
                  />
                  <path
                    d="M 35.9,35.9 C 10,35.9 10,64.1 35.9,64.1"
                    stroke="white"
                    fill="none"
                    strokeDasharray="120"
                    strokeDashoffset="120"
                    className={isThinking ? "hidden" : "animate-draw-loop"}
                    style={{ animationDelay: '0s' }}
                  />

                  {/* TRACING DOTS */}
                  <circle
                    r="3"
                    className={`glowing-dot ${isThinking ? 'hidden' : ''}`}
                    style={{
                      offsetPath: `path('${fullTracePath}')`,
                      animationDelay: '0s'
                    }}
                  />
                  <circle
                    r="3"
                    className={`glowing-dot ${isThinking ? 'hidden' : ''}`}
                    style={{
                      offsetPath: `path('${fullTracePath}')`,
                      animationDelay: '-2s'
                    }}
                  />
                </g>

                {/* THE MIDDLE X */}
                <g>
                  <line
                    x1="30" y1="50" x2="70" y2="50"
                    stroke="white"
                    strokeWidth="6"
                    style={{ transformOrigin: '50px 50px' }}
                    className={`
                      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      ${isMenuOpen || showOracle ? 'rotate-45 translate-y-0' : '-translate-y-[15px] rotate-0'}
                    `}
                  />

                  <line
                    x1="30" y1="50" x2="70" y2="50"
                    stroke="white"
                    strokeWidth="6"
                    className={`
                      transition-all duration-300 ease-out
                      ${isMenuOpen || showOracle ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'}
                    `}
                    style={{ transformOrigin: 'center' }}
                  />

                  <line
                    x1="30" y1="50" x2="70" y2="50"
                    stroke="white"
                    strokeWidth="6"
                    style={{ transformOrigin: '50px 50px' }}
                    className={`
                      transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                      ${isMenuOpen || showOracle ? '-rotate-45 translate-y-0' : 'translate-y-[15px] rotate-0'}
                    `}
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>

        {/* Fullscreen Menu Overlay */}
        <div
          ref={menuContainerRef}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-2xl overflow-hidden h-0"
        >
          <div ref={beltRef} className="w-full h-full flex items-center justify-center">
            <div className="flex flex-col items-center gap-8">
              {siteConfig.navigation.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`menu-item-wrapper text-white font-mono uppercase tracking-widest hover:text-neon-blue transition-all duration-300 text-2xl py-3 ${isMenuOpen ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('#contact')}
                className={`menu-item-wrapper text-neon-purple font-bold font-mono uppercase tracking-widest hover:text-neon-blue transition-all duration-300 text-2xl py-3 ${isMenuOpen ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: `${siteConfig.navigation.length * 0.1}s` }}
              >
                Contact
              </button>

              {/* Oracle Button in Menu */}
              <button
                onClick={() => {
                  setShowOracle(true);
                  consultOracle();
                }}
                className={`menu-item-wrapper text-neon-cyan font-bold font-mono uppercase tracking-widest hover:text-white transition-all duration-300 text-2xl py-3 flex items-center gap-2 ${isMenuOpen ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-4'}`}
                style={{ animationDelay: `${(siteConfig.navigation.length + 1) * 0.1}s` }}
              >
                <span>✨ Oracle</span>
              </button>
            </div>
          </div>
        </div>

        {/* Oracle Modal */}
        <div
          className={`
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 md:w-96
              bg-black/80 backdrop-blur-2xl border border-purple-500/30
              rounded-3xl shadow-[0_0_60px_-10px_rgba(168,85,247,0.3)]
              overflow-hidden p-8 text-center z-[60]
              transition-all duration-700 ease-in-out
              ${showOracle ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none h-0 p-0'}
            `}
        >
          <div className="mb-6">
            <div className="text-purple-300 text-xs uppercase tracking-[0.3em] mb-2 animate-pulse">Connection Established</div>
            <h2 className="text-2xl font-light text-white">
              {isThinking ? "Consulting the Void..." : "The Oracle Speaks"}
            </h2>
          </div>

          <div className="min-h-[80px] flex items-center justify-center">
            {isThinking ? (
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            ) : (
              <p className="text-lg text-cyan-100 leading-relaxed font-light italic">
                "{oracleWisdom.slice(0, typingIndex)}"
                <span className="animate-pulse border-r-2 border-cyan-400 ml-1"></span>
              </p>
            )}
          </div>

          <button
            onClick={consultOracle}
            disabled={isThinking}
            className="mt-8 px-6 py-2 rounded-full bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/50 text-purple-200 text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            Ask Again
          </button>

          <button
            onClick={() => setShowOracle(false)}
            className="mt-4 text-xs text-white/50 hover:text-white transition-colors"
          >
            Close Link
          </button>
        </div>

      </div>
    </nav>
  )
}
