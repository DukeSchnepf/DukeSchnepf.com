# GSAP Animation System - Quick Reference

## Import Statement

```typescript
import { ... } from '@/features/animations/gsap'
```

---

## Timelines

| Function | Description | Returns |
|----------|-------------|---------|
| `createHeroTimeline(config?)` | Hero entrance with stagger | Timeline |
| `createCardRevealTimeline(selector, config?)` | Card grid reveals | Timeline |
| `createSectionTransition(exit, enter, config?)` | Section transitions | Timeline |
| `createParallaxTimeline(layers[], config?)` | Multi-layer parallax | Timeline |
| `createMorphTimeline(element, path, config?)` | SVG morphing | Timeline |
| `createMaskRevealTimeline(element, direction, config?)` | Clip-path reveals | Timeline |
| `createBounceTimeline(element, config?)` | Bounce animations | Timeline |
| `createLoadingTimeline(elements, config?)` | Loading states | Timeline |

### Timeline Orchestrator

```typescript
const orchestrator = new TimelineOrchestrator()
orchestrator.register('id', timeline)
orchestrator.play('id')
orchestrator.pause('id')
orchestrator.playAll()
orchestrator.pauseAll()
orchestrator.reset('id')
orchestrator.clear()
```

---

## Scroll Animations

| Function | Description | Direction |
|----------|-------------|-----------|
| `fadeInOnScroll(target, config?)` | Fade in from bottom | ↑ |
| `slideInOnScroll(target, direction, config?)` | Slide from direction | ←↑→↓ |
| `staggerOnScroll(targets, config?)` | Stagger list items | ↑ |
| `scaleOnScroll(target, from, to, config?)` | Scale animation | - |
| `rotateOnScroll(target, rotation, config?)` | Rotate on scroll | ↻ |
| `parallaxOnScroll(target, speed, config?)` | Parallax effect | ↕ |
| `pinSection(target, config?)` | Pin while scrolling | 📌 |
| `horizontalScroll(container, items, config?)` | Horizontal gallery | ← → |
| `clipPathRevealOnScroll(target, direction, config?)` | Masked reveal | ←↑→↓ |
| `createScrollProgress(bar, config?)` | Progress bar | ▬▬▬→ |
| `animateCounterOnScroll(target, from, to, config?)` | Number counter | 0→100 |

### Utilities

```typescript
batchScrollAnimations(targets, type, config?) // Batch for performance
refreshScrollTriggers() // Refresh after DOM changes
killAllScrollTriggers() // Cleanup all
getScrollProgress() // Current scroll 0-1
```

---

## Text Animations

### Splitting

| Function | Returns |
|----------|---------|
| `splitTextIntoChars(element)` | `HTMLElement[]` |
| `splitTextIntoWords(element)` | `HTMLElement[]` |
| `splitTextIntoLines(element)` | `HTMLElement[]` |

### Reveals

| Function | Effect |
|----------|--------|
| `animateCharReveal(element, config?)` | Character-by-character |
| `animateWordReveal(element, config?)` | Word-by-word |
| `animateLineReveal(element, config?)` | Line-by-line |
| `animateMaskReveal(element, config?)` | Masked slide-up |
| `animateRotateReveal(element, config?)` | 3D rotation |

### Effects

| Function | Effect |
|----------|--------|
| `animateTyping(element, config?)` | Typewriter |
| `animateGlitch(element, config?)` | Glitch/skew |
| `animateScramble(element, config?)` | Text scramble |
| `animateWave(element, config?)` | Wave motion |
| `animateFadeInBlur(element, config?)` | Blur to clear |

### Utilities

```typescript
cleanupSplitText(element) // Remove split markup
addTypingCursorStyles() // Add cursor CSS
```

---

## Common Configurations

### ScrollTrigger Config

```typescript
{
  trigger: string | Element,
  start: 'top 80%',      // When to start
  end: 'bottom 20%',     // When to end
  scrub: true | number,  // Link to scroll
  pin: true | Element,   // Pin element
  markers: true,         // Debug markers
  toggleActions: 'play none none reverse',
  onEnter: () => {},
  onLeave: () => {},
  onEnterBack: () => {},
  onLeaveBack: () => {},
  onUpdate: (self) => {},
}
```

### Timeline Config

```typescript
{
  paused: false,
  repeat: 0,           // -1 for infinite
  yoyo: false,         // Reverse on repeat
  delay: 0,
  onComplete: () => {},
  onStart: () => {},
  onUpdate: () => {},
}
```

### Text Animation Config

```typescript
{
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.1,
  delay: 0,
  scrollTrigger: true, // Enable ScrollTrigger
  trigger: element,
  start: 'top 80%',
  end: 'bottom 20%',
  onComplete: () => {},
}
```

---

## Common Easing Options

| Ease | Description |
|------|-------------|
| `'none'` | Linear |
| `'power1.out'` | Gentle deceleration |
| `'power2.out'` | Medium deceleration |
| `'power3.out'` | Strong deceleration |
| `'power4.out'` | Very strong deceleration |
| `'back.out(1.7)'` | Overshoot and settle |
| `'elastic.out(1, 0.3)'` | Elastic bounce |
| `'bounce.out'` | Bounce effect |

---

## Usage Patterns

### Basic Animation

```tsx
useEffect(() => {
  const animation = fadeInOnScroll('.element')
  return () => animation.kill()
}, [])
```

### With Ref

```tsx
const ref = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (!ref.current) return
  const animation = fadeInOnScroll(ref.current)
  return () => animation.kill()
}, [])
```

### Timeline

```tsx
useEffect(() => {
  const tl = createHeroTimeline({ delay: 0.5 })
  return () => tl.kill()
}, [])
```

### Orchestrator

```tsx
useEffect(() => {
  const orchestrator = new TimelineOrchestrator()
  const tl = createHeroTimeline({ paused: true })
  
  orchestrator.register('hero', tl)
  orchestrator.play('hero')
  
  return () => orchestrator.clear()
}, [])
```

---

## Debugging

### Add Markers

```typescript
fadeInOnScroll('.element', {
  markers: true, // Shows trigger points
})
```

### Check Timing

```typescript
const tl = createHeroTimeline()
console.log(tl.duration()) // Total duration
console.log(tl.progress()) // Current progress 0-1
```

### Refresh ScrollTrigger

```typescript
import { refreshScrollTriggers } from '@/features/animations/gsap'

// After DOM changes
refreshScrollTriggers()
```

---

## Performance Tips

1. **Batch Animations**
   ```typescript
   batchScrollAnimations('.item', 'fadeIn')
   ```

2. **Cleanup**
   ```typescript
   return () => animation.kill()
   ```

3. **Scope with Context**
   ```typescript
   const context = useGSAP({ scope: containerRef })
   ```

4. **Use Refs**
   ```typescript
   const ref = useRef<HTMLDivElement>(null)
   animateCharReveal(ref.current)
   ```

---

## Files Reference

```
src/features/animations/gsap/
├── index.ts          # Main exports
├── timelines.ts      # Timeline utilities
├── scroll.ts         # Scroll animations
└── text.ts           # Text effects
```

---

## Resources

- **Summary:** `STEP_5_SUMMARY.md`
- **Examples:** `GSAP_ANIMATION_EXAMPLES.md`
- **Status:** `ENHANCEMENT_PLAN_STATUS.md`
- **GSAP Docs:** https://gsap.com/docs/v3/

