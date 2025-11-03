/**
 * Anime.js Animation System - Central Export
 * 
 * Complete Anime.js toolkit including:
 * - Micro-interactions (20+ button, card, badge, icon effects)
 * - Effects (particle trails, SVG animations, counters, etc.)
 * - React hooks (useAnime, useAnimeTimeline, useAnimeScroll, etc.)
 */

export * from './micro-interactions'
export * from './effects'

// Re-export hooks from hooks directory
export { 
  useAnime, 
  useAnimeTimeline, 
  useAnimeScroll, 
  useAnimeHover, 
  useAnimeCounter 
} from '@/hooks/useAnime'

