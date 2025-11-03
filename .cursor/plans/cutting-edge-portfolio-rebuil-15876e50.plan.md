<!-- 15876e50-5685-48ba-a158-e6d7a3ec000a 61bf6b23-d2f7-4a6a-812b-eaf910c2cc99 -->
# Cutting-Edge Portfolio Website Rebuild

## Rubric: What Makes Exceptional Personal Websites Stand Out

### Analyzed Examples & Key Takeaways

**1. Bruno Simon (bruno-simon.com)**

- Interactive 3D car game as navigation
- **Lesson**: Make the interface itself a playful experience, not just content display
- Uses R3F (React Three Fiber) with physics

**2. Aristide Benoist (aristidebenoist.com)**

- Bold typography with dramatic scroll-based reveals
- Minimal color palette (black/white/accent)
- **Lesson**: Brutalist typography + precise timing = memorable impact

**3. Olaolu Olawuyi (olaolu.dev)**

- Terminal/code aesthetic with interactive CLI
- Particle systems that react to cursor
- **Lesson**: Tech authenticity through interface metaphors

**4. Jacek Jeznach (jacekjeznach.com)**

- Geometric shapes morphing with WebGL
- Sections transition like app states
- **Lesson**: Treat website as a living application, not pages

**5. Giovanni Muzio (giovannimuzio.com)**

- Physics-based interactions with draggable elements
- Minimal UI with maximum interactivity
- **Lesson**: Let users "play" with the interface

### Core Principles Extracted

1. **Personality First**: Interface reflects who you are (tech/gaming/sci-fi)
2. **Performance Obsessed**: Smooth 60fps animations, optimized assets
3. **Purposeful Motion**: Every animation serves navigation or storytelling
4. **Interactive Discovery**: Users explore rather than scroll passively
5. **Technical Showcase**: The site itself demonstrates your skills

---

## Architecture & File Structure

### Enhanced Structure

```
src/
├── core/
│   ├── animation/
│   │   ├── AnimationEngine.ts          # Centralized animation orchestrator
│   │   ├── gsap/
│   │   │   ├── presets.ts              # GSAP animation presets
│   │   │   ├── scrollAnimations.ts     # ScrollTrigger configurations
│   │   │   └── timelines.ts            # Reusable timeline sequences
│   │   ├── anime/
│   │   │   ├── presets.ts              # Anime.js specific animations
│   │   │   ├── morphing.ts             # SVG/shape morphing
│   │   │   └── stagger.ts              # Complex stagger patterns
│   │   └── coordinators/
│   │       ├── PageTransitions.ts      # Route change animations
│   │       └── ScrollCoordinator.ts    # Syncs scroll with 3D/particles
│   │
│   ├── three/
│   │   ├── SceneManager.ts             # Main Three.js orchestrator
│   │   ├── scenes/
│   │   │   ├── HeroScene.tsx           # Hero 3D scene
│   │   │   ├── AboutScene.tsx          # About section 3D elements
│   │   │   └── ProjectsScene.tsx       # Project showcases
│   │   ├── objects/
│   │   │   ├── CentralModel.tsx        # Main hero 3D model (PLACEHOLDER)
│   │   │   ├── ParticleField.tsx       # Interactive particle system
│   │   │   └── GeometricShapes.tsx     # Brutalist geometric elements
│   │   ├── effects/
│   │   │   ├── PostProcessing.tsx      # Bloom, glitch, chromatic aberration
│   │   │   └── Shaders.ts              # Custom GLSL shaders
│   │   └── controls/
│   │       ├── MouseInteraction.ts     # Cursor-based 3D interactions
│   │       └── ScrollSync.ts           # Scroll-driven 3D changes
│   │
│   └── state/
│       ├── stores/
│       │   ├── uiStore.ts              # UI state (Zustand)
│       │   ├── animationStore.ts       # Animation state coordination
│       │   └── sceneStore.ts           # 3D scene state
│       └── hooks/
│           ├── useAnimation.ts         # Animation hook with cleanup
│           ├── useSceneState.ts        # 3D scene state hook
│           └── useScrollProgress.ts    # Normalized scroll position
│
├── features/
│   ├── hero/
│   │   ├── Hero.tsx                    # Main hero component
│   │   ├── HeroContent.tsx             # Text content with animations
│   │   ├── Hero3D.tsx                  # 3D scene wrapper
│   │   └── HeroParticles.tsx           # Particle overlay system
│   │
│   ├── sections/
│   │   ├── About/
│   │   │   ├── About.tsx
│   │   │   ├── AboutTimeline.tsx       # Career timeline with scroll animations
│   │   │   └── SkillsOrbit.tsx         # 3D orbiting skill badges
│   │   ├── Projects/
│   │   │   ├── Projects.tsx
│   │   │   ├── ProjectCard.tsx         # 3D flip card with hover effects
│   │   │   └── ProjectModal.tsx        # Fullscreen project viewer
│   │   ├── Experience/
│   │   │   └── ExperienceGraph.tsx     # Animated connection graph
│   │   └── Contact/
│   │       ├── Contact.tsx
│   │       └── ContactField.tsx        # Particle-enhanced form fields
│   │
│   └── ui/
│       ├── cursor/
│       │   └── CustomCursor.tsx        # Custom cursor with trail
│       ├── transitions/
│       │   └── PageTransition.tsx      # Route transition wrapper
│       └── loaders/
│           └── SceneLoader.tsx         # 3D asset loading screen
│
├── assets/
│   ├── models/
│   │   ├── hero-model.glb              # PLACEHOLDER: Main hero 3D model
│   │   └── tech-objects/               # PLACEHOLDER: Small tech objects
│   ├── svg/
│   │   ├── icons/                      # Tech-themed icons
│   │   └── patterns/                   # Geometric SVG patterns
│   └── shaders/
│       ├── particle.vert               # Particle vertex shader
│       └── particle.frag               # Particle fragment shader
│
└── styles/
    ├── core/
    │   ├── variables.css               # CSS custom properties
    │   ├── typography.css              # Bold brutalist typography system
    │   └── animations.css              # CSS animation utilities
    └── themes/
        └── dark-minimal.css            # Main dark theme
```

---

## Implementation Plan

### Phase 1: Core Animation Engine

**Goal**: Create centralized animation system that coordinates GSAP, Anime.js, and Three.js

**Files to Create/Modify**:

- `src/core/animation/AnimationEngine.ts` - Master controller
- `src/core/animation/coordinators/ScrollCoordinator.ts` - Syncs scroll position across all systems
- `src/core/state/stores/animationStore.ts` - Global animation state

**Key Features**:

- Single source of truth for scroll position
- Queue system for animation sequences
- Performance monitoring and FPS throttling
- Automatic cleanup on unmount

### Phase 2: Enhanced Three.js Setup

**Goal**: Build modular 3D scene system with particle effects

**Files to Create/Modify**:

- `src/core/three/SceneManager.ts` - Scene lifecycle management
- `src/core/three/objects/ParticleField.tsx` - Mouse-reactive particle system using Points and custom shaders
- `src/core/three/objects/CentralModel.tsx` - PLACEHOLDER for hero 3D model
- `src/core/three/effects/PostProcessing.tsx` - Bloom, vignette effects
- `src/core/three/controls/MouseInteraction.ts` - Raycasting and cursor interactions

**Key Features**:

- Particle system with 10k+ particles responding to mouse
- Custom shaders for unique visual effects
- LOD (Level of Detail) for performance
- Instance rendering for geometric shapes

### Phase 3: Hero Section Rebuild

**Goal**: Create stunning hero with 3D model + particles + bold typography

**Files to Create/Modify**:

- `src/features/hero/Hero.tsx` - Main container with layering
- `src/features/hero/Hero3D.tsx` - 3D scene (model + particles)
- `src/features/hero/HeroContent.tsx` - Typography with GSAP split-text animations
- `src/features/hero/HeroParticles.tsx` - 2D canvas particle overlay (additional layer)

**Key Features**:

- 3D model rotates based on cursor position
- Particle field morphs around model
- Typography reveals with staggered letter animations
- Scroll-based scene transitions

### Phase 4: Custom Cursor & Interactions

**Goal**: Replace default cursor with custom interactive cursor

**Files to Create/Modify**:

- `src/features/ui/cursor/CustomCursor.tsx` - SVG-based cursor with spring animations
- `src/hooks/useCursor.ts` - Cursor state management
- `src/styles/core/cursor.css` - Hide default cursor

**Key Features**:

- Morphs on hover states (links, buttons, 3D objects)
- Trail effect using Anime.js
- Click ripple animation

### Phase 5: Brutalist Typography System

**Goal**: Implement bold, impactful typography with advanced animations

**Files to Create/Modify**:

- `src/styles/core/typography.css` - Type scale and styles
- `src/core/animation/anime/morphing.ts` - Text morphing animations
- `src/components/ui/AnimatedHeading.tsx` - Reusable heading component

**Key Features**:

- Oversized headings (80px+ on desktop)
- Split-text animations (letter-by-letter reveals)
- Glitch effects on hover
- Number counter animations

### Phase 6: Scroll-Driven Narrative

**Goal**: Each scroll section triggers coordinated animations across all systems

**Files to Create/Modify**:

- `src/core/animation/coordinators/ScrollCoordinator.ts` - Master scroll controller
- `src/features/sections/About/About.tsx` - Update with scroll triggers
- `src/features/sections/Projects/Projects.tsx` - Update with scroll triggers

**Key Features**:

- Horizontal scroll section for projects
- Parallax layers (foreground/midground/background)
- 3D camera movements tied to scroll
- Progress indicator

### Phase 7: Project Showcase

**Goal**: Interactive 3D project cards with immersive presentations

**Files to Create/Modify**:

- `src/features/sections/Projects/ProjectCard.tsx` - 3D flip card
- `src/features/sections/Projects/ProjectModal.tsx` - Fullscreen modal with 3D preview
- `src/core/three/scenes/ProjectsScene.tsx` - 3D scene for project cards

**Key Features**:

- Cards float in 3D space
- Hover reveals project details
- Click expands to fullscreen with smooth transition
- Each project has unique 3D asset/color scheme

### Phase 8: Contact Section with Particle Field

**Goal**: Form that integrates with particle system

**Files to Create/Modify**:

- `src/features/sections/Contact/Contact.tsx` - Update with 3D elements
- `src/features/sections/Contact/ContactField.tsx` - Input with particle interactions
- Forms attract/repel particles on focus

### Phase 9: Performance Optimization

**Goal**: Ensure 60fps across all devices

**Tasks**:

- Implement GPU instancing for repeated geometries
- Lazy load 3D models with suspense boundaries
- Debounce scroll/mouse events
- Use `will-change` CSS property strategically
- Implement progressive enhancement (fallback for low-end devices)

### Phase 10: Polish & Easter Eggs

**Goal**: Add delightful surprises for explorers

**Ideas**:

- Konami code triggers special animation
- Hidden terminal accessible via keyboard shortcut
- Time-based theme variations (different particles at night)
- Achievement system for discovering features

---

## Technology Stack Decisions

### GSAP Usage

- **Primary**: ScrollTrigger for all scroll-based animations
- **Secondary**: Timelines for complex sequences
- **Typography**: SplitText plugin for letter animations

### Anime.js Usage

- **Primary**: SVG morphing and path animations
- **Secondary**: Stagger animations for lists/grids
- **UI**: Spring-based micro-interactions

### Three.js (via R3F) Usage

- **Primary**: Hero 3D scene with model + particles
- **Secondary**: Floating elements throughout site
- **Effects**: Post-processing for bloom/depth

### When to Use Each

- **GSAP**: Scroll-tied animations, timelines, DOM transforms
- **Anime.js**: SVG manipulation, complex easing, stagger patterns
- **Three.js**: 3D objects, particles, WebGL shaders
- **Framer Motion**: Page transitions, layout animations

---

## Asset Placeholders Needed

### 3D Models (GLTF/GLB format)

1. `hero-model.glb` - Main centerpiece (suggestion: abstract tech device, geometric sculpture, or stylized logo)
2. `tech-objects/*.glb` - Small floating objects (chips, circuits, cubes)

### SVG Assets

1. Tech-themed icons (AI, code brackets, gaming controller, dumbbell, molecule)
2. Geometric patterns for backgrounds
3. Logo/wordmark

### Shader Development

- Custom particle shader with color gradients
- Holographic material shader
- Glitch/distortion shader

---

## Design Tokens

### Color Palette (Minimalist + Gaming)

```css
--color-bg: #0a0a0a;
--color-surface: #1a1a1a;
--color-text: #f5f5f5;
--color-accent: #00ff88; /* Neon green gaming accent */
--color-accent-2: #8800ff; /* Purple secondary */
--color-muted: #666666;
```

### Typography Scale

```css
--font-display: 'Space Grotesk', sans-serif; /* Bold, geometric */
--font-body: 'Inter', sans-serif;

--text-xs: 0.75rem;
--text-sm: 0.875rem;
--text-base: 1rem;
--text-lg: 1.125rem;
--text-xl: 1.5rem;
--text-2xl: 2rem;
--text-3xl: 3rem;
--text-4xl: 4rem;
--text-5xl: 5rem;
--text-6xl: 7rem; /* Hero size */
```

### Animation Timings

```css
--duration-instant: 0.1s;
--duration-fast: 0.2s;
--duration-base: 0.3s;
--duration-slow: 0.5s;
--duration-slower: 0.8s;
```

---

## Development Workflow

1. **Start with Animation Engine** - Build foundation first
2. **Test with Simple Shapes** - Validate performance before adding complex models
3. **Iterate on Hero** - Get hero perfect before moving on
4. **Build Section by Section** - Complete each section fully
5. **Optimize Continuously** - Monitor performance throughout

## Success Metrics

- Lighthouse Performance Score > 90
- 60 FPS scroll and interactions
- < 3s initial load time
- Works on devices 2+ years old
- Memorable enough to share

---

This plan prioritizes scalability, performance, and personality. The modular architecture means you can easily add new sections, swap 3D models, or experiment with different effects without refactoring core systems.

### To-dos

- [ ] Build core animation engine (AnimationEngine.ts, ScrollCoordinator, stores)
- [ ] Create SceneManager, ParticleField, PostProcessing, and MouseInteraction systems
- [ ] Build new Hero with 3D model placeholder, particles, and bold typography animations
- [ ] Implement custom cursor with morphing states and trail effects
- [ ] Create brutalist typography system with split-text animations and glitch effects
- [ ] Implement scroll-driven animations across all sections with coordinated 3D camera movements
- [ ] Build 3D project cards with floating animations and fullscreen modal viewer
- [ ] Create contact form with particle field interactions on input focus
- [ ] Optimize rendering with GPU instancing, lazy loading, and progressive enhancement
- [ ] Add delightful surprises (Konami code, hidden terminal, achievements)