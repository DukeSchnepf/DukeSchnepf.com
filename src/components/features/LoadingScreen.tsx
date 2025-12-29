import { useEffect, useState, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import gsap from 'gsap';

interface LoadingScreenProps {
    onComplete: () => void;
}

export interface LoadingScreenRef {
    triggerExit: () => Promise<void>;
}

// ===== SPRING PHYSICS =====
class Spring {
    value: number;
    target: number;
    velocity: number;
    stiffness: number;
    damping: number;

    constructor(value: number, stiffness = 0.1, damping = 0.8) {
        this.value = value;
        this.target = value;
        this.velocity = 0;
        this.stiffness = stiffness;
        this.damping = damping;
    }

    update(dt: number): number {
        const dtNorm = dt / 16.67;
        const force = (this.target - this.value) * this.stiffness;
        this.velocity += force * dtNorm;
        this.velocity *= Math.pow(this.damping, dtNorm);
        this.value += this.velocity * dtNorm;
        return this.value;
    }

    set(value: number): void {
        this.target = value;
    }

    snap(value: number): void {
        this.value = value;
        this.target = value;
        this.velocity = 0;
    }
}

// ===== EASING =====
const Easing = {
    easeOutCubic: (t: number): number => 1 - Math.pow(1 - t, 3),
};

// ===== SINE LOOKUP TABLE =====
const SINE_TABLE_SIZE = 720;
const sineTable = new Float32Array(SINE_TABLE_SIZE);
const cosTable = new Float32Array(SINE_TABLE_SIZE);
const TWO_PI = Math.PI * 2;

for (let i = 0; i < SINE_TABLE_SIZE; i++) {
    const angle = (i / SINE_TABLE_SIZE) * TWO_PI;
    sineTable[i] = Math.sin(angle);
    cosTable[i] = Math.cos(angle);
}

function fastSin(angle: number): number {
    const normalized = ((angle % TWO_PI) + TWO_PI) % TWO_PI;
    const index = ((normalized / TWO_PI) * SINE_TABLE_SIZE) | 0;
    return sineTable[index];
}

function fastCos(angle: number): number {
    const normalized = ((angle % TWO_PI) + TWO_PI) % TWO_PI;
    const index = ((normalized / TWO_PI) * SINE_TABLE_SIZE) | 0;
    return cosTable[index];
}

function smoothSin(angle: number): number {
    const normalized = ((angle % TWO_PI) + TWO_PI) % TWO_PI;
    const indexFloat = (normalized / TWO_PI) * SINE_TABLE_SIZE;
    const index = indexFloat | 0;
    const frac = indexFloat - index;
    const next = (index + 1) % SINE_TABLE_SIZE;
    return sineTable[index] + (sineTable[next] - sineTable[index]) * frac;
}

// ===== CONFIG =====
const CONFIG = {
    birdCount: 40,
    survivorCount: 5,
    baseRadius: 120,
    radiusVar: 30,
    baseSpeed: 0.02,
    speedVar: 0.005,
    birdSize: 10,
    mouseThrottle: 16,
};

const BUTTON = {
    initialSize: 180,
    targetWidth: 280,
    targetHeight: 60,
    targetRadius: 30,
};

const MORPH_DURATION = 800;

// ===== BIRD CLASS =====
class Bird {
    index: number;
    angle: number;
    radiusOffset: number;
    speedOffset: number;
    flapPhase: number;
    flapSpeed: number;
    hoverYOffset: number;
    displayAngle: number;
    active: boolean;
    arrivedAtButton: boolean;
    distFromCenter: Spring;
    x: Spring;
    y: Spring;
    opacity: Spring;

    constructor(index: number, centerX: number, centerY: number) {
        this.index = index;
        this.angle = Math.random() * TWO_PI;
        this.radiusOffset = (Math.random() - 0.5) * CONFIG.radiusVar;
        this.speedOffset = (Math.random() - 0.5) * CONFIG.speedVar;
        this.flapPhase = Math.random() * TWO_PI;
        this.flapSpeed = 0.15 + Math.random() * 0.1;
        this.hoverYOffset = Math.random() * TWO_PI;
        this.displayAngle = 0;
        this.active = true;
        this.arrivedAtButton = false;

        this.distFromCenter = new Spring(CONFIG.baseRadius + this.radiusOffset, 0.12, 0.85);
        this.x = new Spring(0, 0.1, 0.8);
        this.y = new Spring(0, 0.1, 0.8);
        this.opacity = new Spring(1, 0.08, 0.9);

        const dist = this.distFromCenter.value;
        this.x.snap(centerX + fastCos(this.angle) * dist);
        this.y.snap(centerY + fastSin(this.angle) * dist);
    }

    update(
        dt: number,
        phase: string,
        centerX: number,
        centerY: number,
        buttonWidth: number,
        buttonHeight: number
    ): void {
        if (!this.active) return;

        this.flapPhase += this.flapSpeed * (dt / 16.67);

        if (phase === 'loading') {
            const angularSpeed = (CONFIG.baseSpeed + this.speedOffset) * (dt / 16.67);
            this.angle += angularSpeed;

            const dist = this.distFromCenter.value;
            this.x.set(centerX + fastCos(this.angle) * dist);
            this.y.set(centerY + fastSin(this.angle) * dist);

            this.x.update(dt);
            this.y.update(dt);
        } else if (phase === 'morphing' || phase === 'button') {
            if (this.arrivedAtButton) {
                if (this.index >= CONFIG.survivorCount) {
                    this.opacity.set(0);
                    this.opacity.update(dt);
                    if (this.opacity.value < 0.01) {
                        this.active = false;
                    }
                    return;
                }

                const h = buttonHeight;
                const liquidLvl = phase === 'morphing' ? h / 2 : h * 0.6;
                const liquidSurfaceY = h / 2 - liquidLvl;
                const targetHoverY = liquidSurfaceY - 15;

                this.angle += (CONFIG.baseSpeed * 2 + this.speedOffset) * (dt / 16.67);

                const maxX = buttonWidth / 2 - 15;
                const targetX = centerX + smoothSin(this.angle) * maxX;
                const targetY = centerY + targetHoverY + smoothSin(this.angle * 3 + this.hoverYOffset) * 5;

                this.x.set(targetX);
                this.y.set(targetY);
                this.x.update(dt);
                this.y.update(dt);

                const targetAngle = smoothSin(this.angle) < 0 ? -Math.PI / 2 : Math.PI / 2;
                const bobAngle = smoothSin(this.angle * 3 + this.hoverYOffset) * 0.3;
                this.displayAngle += ((targetAngle + bobAngle) - this.displayAngle) * 0.1 * (dt / 16.67);
            } else {
                this.distFromCenter.set(0);
                this.distFromCenter.stiffness = 0.05;
                this.distFromCenter.update(dt);

                const dist = this.distFromCenter.value;
                const angularSpeed =
                    (CONFIG.baseSpeed + this.speedOffset + (50 / Math.max(dist, 10)) * 0.005) * (dt / 16.67);
                this.angle += angularSpeed;

                this.x.set(centerX + fastCos(this.angle) * dist);
                this.y.set(centerY + fastSin(this.angle) * dist);
                this.x.update(dt);
                this.y.update(dt);

                if (dist < buttonWidth / 6) {
                    this.arrivedAtButton = true;
                    this.x.snap(centerX);
                    this.y.snap(centerY);
                }
            }
        }

        this.opacity.update(dt);
    }
}

// ===== ANIMATION STATE TYPE =====
interface AnimationState {
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    birds: Bird[];
    progress: number;
    displayProgress: number;
    phase: 'loading' | 'morphing' | 'button';
    isHovering: boolean;
    lastMouseMove: number;
    lastTimestamp: number;
    morphStartTime: number;
    morphProgress: number;
    waveTime: number;
    backgroundGradient: CanvasGradient | null;
    buttonWidth: Spring;
    buttonHeight: Spring;
    buttonRadius: Spring;
    liquidLevel: Spring;
    hoverScale: Spring;
}

export const LoadingScreen = forwardRef<LoadingScreenRef, LoadingScreenProps>(({ onComplete }, ref) => {
    const [progress, setProgress] = useState(0);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [canvasPhase, setCanvasPhase] = useState<'loading' | 'morphing' | 'button'>('loading');
    const [showLoadingText, setShowLoadingText] = useState(true);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const loadingTextRef = useRef<HTMLDivElement>(null);
    const stateRef = useRef<AnimationState | null>(null);

    // Expose triggerExit method to parent
    useImperativeHandle(ref, () => ({
        triggerExit: () => {
            return new Promise<void>((resolve) => {
                const wrapper = wrapperRef.current;
                if (!wrapper) {
                    resolve();
                    return;
                }

                gsap.to(wrapper, {
                    opacity: 0,
                    duration: 1,
                    ease: 'power2.inOut',
                    onComplete: resolve,
                });
            });
        },
    }));

    // Handle scroll locking
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    // Track page load
    useEffect(() => {
        const handleLoad = () => setIsPageLoaded(true);

        if (document.readyState === 'complete') {
            setIsPageLoaded(true);
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => window.removeEventListener('load', handleLoad);
    }, []);

    // Progress simulation
    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (!isReady) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (isPageLoaded) {
                        const increment = Math.random() * 15 + 5;
                        const newProgress = prev + increment;
                        return newProgress >= 100 ? 100 : newProgress;
                    }

                    if (prev < 90) {
                        const increment = Math.random() * 2 + 0.5;
                        return prev + increment;
                    }

                    return prev;
                });
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isPageLoaded, isReady]);

    // Check for completion
    useEffect(() => {
        if (progress >= 100) {
            setIsReady(true);
        }
    }, [progress]);

    // Sync progress with canvas animation
    useEffect(() => {
        if (stateRef.current) {
            stateRef.current.progress = progress;
        }
    }, [progress]);

    // Handle loading text visibility with GSAP
    useEffect(() => {
        const el = loadingTextRef.current;
        if (!el) return;

        if (canvasPhase === 'loading' && showLoadingText) {
            gsap.to(el, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        } else {
            gsap.to(el, { 
                opacity: 0, 
                duration: 0.5, 
                ease: 'power2.out',
                onComplete: () => {
                    if (canvasPhase !== 'loading') {
                        setShowLoadingText(false);
                    }
                }
            });
        }
    }, [canvasPhase, showLoadingText]);

    // Drawing functions
    const drawBird = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            bird: Bird,
            localCoords: boolean,
            centerX: number,
            centerY: number
        ) => {
            const bx = localCoords ? bird.x.value - centerX : bird.x.value;
            const by = localCoords ? bird.y.value - centerY : bird.y.value;
            const angle = localCoords ? bird.displayAngle : bird.angle;

            ctx.save();
            ctx.translate(bx, by);
            ctx.rotate(angle + Math.PI / 2);

            const wingY = smoothSin(bird.flapPhase) * 5;
            const wingX = CONFIG.birdSize;

            ctx.beginPath();
            ctx.moveTo(-wingX, -wingY);
            ctx.quadraticCurveTo(-wingX * 0.3, -wingY * 0.5, 0, 0);
            ctx.quadraticCurveTo(wingX * 0.3, -wingY * 0.5, wingX, -wingY);
            ctx.stroke();

            ctx.restore();
        },
        []
    );

    const drawRoundedRect = useCallback(
        (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
        },
        []
    );

    const drawSmoothWaves = useCallback(
        (
            ctx: CanvasRenderingContext2D,
            x: number,
            y: number,
            w: number,
            h: number,
            liquidHeight: number,
            time: number,
            isHovering: boolean,
            phase: string
        ) => {
            const waveHeight = phase === 'loading' ? 5 : 10;
            const baseY = y + h - liquidHeight;

            ctx.fillStyle =
                isHovering && phase === 'button' ? 'rgba(30, 58, 138, 0.6)' : 'rgba(30, 58, 138, 0.4)';

            ctx.beginPath();
            ctx.moveTo(x, y + h);
            ctx.lineTo(x, baseY + smoothSin(time) * waveHeight);

            const segments = 4;
            const segWidth = w / segments;

            for (let i = 0; i < segments; i++) {
                const x1 = x + i * segWidth;
                const x2 = x + (i + 1) * segWidth;
                const xMid = (x1 + x2) / 2;

                const y2 = baseY + smoothSin(x2 * 0.05 + time) * waveHeight;
                const yMid = baseY + smoothSin(xMid * 0.05 + time) * waveHeight * 1.2;

                ctx.quadraticCurveTo(xMid, yMid, x2, y2);
            }

            ctx.lineTo(x + w, y + h);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle =
                isHovering && phase === 'button' ? 'rgba(30, 58, 138, 0.8)' : 'rgba(30, 58, 138, 0.6)';

            ctx.beginPath();
            ctx.moveTo(x, y + h);
            ctx.lineTo(x, baseY + 5 + smoothSin(time + 2) * waveHeight);

            for (let i = 0; i < segments; i++) {
                const x1 = x + i * segWidth;
                const x2 = x + (i + 1) * segWidth;
                const xMid = (x1 + x2) / 2;

                const y2 = baseY + 5 + smoothSin(x2 * 0.04 + time + 2) * waveHeight;
                const yMid = baseY + 5 + smoothSin(xMid * 0.04 + time + 2) * waveHeight * 1.1;

                ctx.quadraticCurveTo(xMid, yMid, x2, y2);
            }

            ctx.lineTo(x + w, y + h);
            ctx.closePath();
            ctx.fill();
        },
        []
    );

    // Canvas animation
    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        // Initialize state
        const state: AnimationState = {
            width: 0,
            height: 0,
            centerX: 0,
            centerY: 0,
            birds: [],
            progress: 0,
            displayProgress: 0,
            phase: 'loading',
            isHovering: false,
            lastMouseMove: 0,
            lastTimestamp: 0,
            morphStartTime: 0,
            morphProgress: 0,
            waveTime: 0,
            backgroundGradient: null,
            buttonWidth: new Spring(BUTTON.initialSize, 0.08, 0.75),
            buttonHeight: new Spring(BUTTON.initialSize, 0.08, 0.75),
            buttonRadius: new Spring(BUTTON.initialSize / 2, 0.08, 0.75),
            liquidLevel: new Spring(0, 0.06, 0.82),
            hoverScale: new Spring(1, 0.15, 0.7),
        };

        stateRef.current = state;

        // Resize handler
        const handleResize = () => {
            const rect = container.getBoundingClientRect();
            state.width = canvas.width = rect.width;
            state.height = canvas.height = rect.height;
            state.centerX = state.width / 2;
            state.centerY = state.height / 2;

            state.backgroundGradient = ctx.createRadialGradient(
                state.centerX,
                state.centerY,
                60,
                state.centerX,
                state.centerY,
                300
            );
            state.backgroundGradient.addColorStop(0, 'rgba(30, 58, 138, 0.1)');
            state.backgroundGradient.addColorStop(1, 'rgba(2, 6, 23, 0)');

            state.birds.forEach((bird) => {
                if (!bird.arrivedAtButton) {
                    const dist = bird.distFromCenter.value;
                    bird.x.snap(state.centerX + fastCos(bird.angle) * dist);
                    bird.y.snap(state.centerY + fastSin(bird.angle) * dist);
                }
            });
        };

        handleResize();

        // Initialize birds
        for (let i = 0; i < CONFIG.birdCount; i++) {
            state.birds.push(new Bird(i, state.centerX, state.centerY));
        }

        // Mouse handlers
        const handleMouseMove = (e: MouseEvent) => {
            if (state.phase !== 'button') return;

            const now = performance.now();
            if (now - state.lastMouseMove < CONFIG.mouseThrottle) return;
            state.lastMouseMove = now;

            const rect = canvas.getBoundingClientRect();
            const mx = e.clientX - rect.left;
            const my = e.clientY - rect.top;

            const hw = (state.buttonWidth.value / 2) * state.hoverScale.value;
            const hh = (state.buttonHeight.value / 2) * state.hoverScale.value;

            state.isHovering =
                mx > state.centerX - hw &&
                mx < state.centerX + hw &&
                my > state.centerY - hh &&
                my < state.centerY + hh;

            canvas.style.cursor = state.isHovering ? 'pointer' : 'default';
        };

        const handleClick = () => {
            if (state.phase === 'button' && state.isHovering) {
                state.hoverScale.velocity = -0.3;
                setTimeout(() => {
                    onComplete();
                }, 150);
            }
        };

        // Animation loop
        let animationId: number;
        state.lastTimestamp = performance.now();

        const animate = (timestamp: number) => {
            const dt = Math.min(timestamp - state.lastTimestamp, 50);
            state.lastTimestamp = timestamp;

            state.waveTime += dt * 0.003;

            // Update morph
            if (state.phase === 'morphing') {
                const elapsed = timestamp - state.morphStartTime;
                state.morphProgress = Math.min(1, elapsed / MORPH_DURATION);

                const easedProgress = Easing.easeOutCubic(state.morphProgress);

                state.buttonWidth.set(
                    BUTTON.initialSize + (BUTTON.targetWidth - BUTTON.initialSize) * easedProgress
                );
                state.buttonHeight.set(
                    BUTTON.initialSize + (BUTTON.targetHeight - BUTTON.initialSize) * easedProgress
                );
                state.buttonRadius.set(
                    BUTTON.initialSize / 2 + (BUTTON.targetRadius - BUTTON.initialSize / 2) * easedProgress
                );
                state.liquidLevel.set(0.6 + 0.4 * (1 - easedProgress));

                if (state.morphProgress >= 1) {
                    state.phase = 'button';
                    setCanvasPhase('button');
                }
            }

            // Update springs
            state.buttonWidth.update(dt);
            state.buttonHeight.update(dt);
            state.buttonRadius.update(dt);
            state.liquidLevel.update(dt);
            state.hoverScale.update(dt);

            state.hoverScale.set(state.isHovering && state.phase === 'button' ? 1.03 : 1);

            if (state.phase === 'loading') {
                state.liquidLevel.set(state.progress / 100);
            }

            state.displayProgress += (state.progress - state.displayProgress) * 0.15 * (dt / 16.67);

            // Clear with transparency
            ctx.clearRect(0, 0, state.width, state.height);

            // Background gradient
            if (state.backgroundGradient) {
                ctx.fillStyle = state.backgroundGradient;
                ctx.fillRect(0, 0, state.width, state.height);
            }

            // Update birds
            state.birds.forEach((bird) => {
                bird.update(
                    dt,
                    state.phase,
                    state.centerX,
                    state.centerY,
                    state.buttonWidth.value,
                    state.buttonHeight.value
                );
            });

            // Draw button
            const currentW = state.buttonWidth.value;
            const currentH = state.buttonHeight.value;
            const currentR = state.buttonRadius.value;
            const scale = state.hoverScale.value;

            ctx.save();
            ctx.translate(state.centerX, state.centerY);
            ctx.scale(scale, scale);

            const x = -currentW / 2;
            const y = -currentH / 2;

            drawRoundedRect(ctx, x, y, currentW, currentH, currentR);

            ctx.strokeStyle = 'rgba(203, 213, 225, 0.2)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.clip();

            ctx.fillStyle =
                state.isHovering && state.phase === 'button'
                    ? 'rgba(15, 23, 42, 0.9)'
                    : 'rgba(2, 6, 23, 0.6)';
            ctx.fillRect(x, y, currentW, currentH);

            const liquidHeight = currentH * state.liquidLevel.value;
            drawSmoothWaves(
                ctx,
                x,
                y,
                currentW,
                currentH,
                liquidHeight,
                state.waveTime,
                state.isHovering,
                state.phase
            );

            // Internal birds
            if (state.phase !== 'loading') {
                ctx.strokeStyle = '#cbd5e1';
                ctx.lineWidth = 2;
                ctx.lineCap = 'round';
                ctx.lineJoin = 'round';

                state.birds.forEach((bird) => {
                    if (bird.arrivedAtButton && bird.opacity.value > 0.5 && bird.index < CONFIG.survivorCount) {
                        ctx.globalAlpha = bird.opacity.value;
                        drawBird(ctx, bird, true, state.centerX, state.centerY);
                    }
                });
                ctx.globalAlpha = 1;
            }

            // Button text
            if (state.phase === 'button') {
                const textOpacity = Math.min(1, (state.morphProgress - 0.8) / 0.2);
                if (textOpacity > 0) {
                    ctx.globalAlpha = Easing.easeOutCubic(textOpacity);
                    ctx.fillStyle = '#cbd5e1';
                    ctx.font = '300 18px "Inter", "Segoe UI", sans-serif';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.letterSpacing = '0.2em';
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = 'black';
                    ctx.fillText('ENTER EXPERIENCE', 0, 0);
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;
                }
            }

            ctx.restore();

            // External birds
            ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            state.birds.forEach((bird) => {
                if (!bird.active || bird.arrivedAtButton) return;

                const opacity = bird.opacity.value;
                if (opacity <= 0.01) return;

                ctx.globalAlpha = opacity;
                drawBird(ctx, bird, false, state.centerX, state.centerY);
            });
            ctx.globalAlpha = 1;

            animationId = requestAnimationFrame(animate);
        };

        // Start
        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
        canvas.addEventListener('click', handleClick);
        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('click', handleClick);
        };
    }, [drawBird, drawRoundedRect, drawSmoothWaves, onComplete]);

    // Trigger morph when loading completes
    useEffect(() => {
        if (isReady && stateRef.current && stateRef.current.phase === 'loading') {
            setTimeout(() => {
                if (stateRef.current) {
                    stateRef.current.phase = 'morphing';
                    stateRef.current.morphStartTime = performance.now();
                    setCanvasPhase('morphing');
                }
            }, 400);
        }
    }, [isReady]);

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-transparent h-dvh w-screen"
        >
            {/* Canvas Layer */}
            <div ref={containerRef} className="absolute inset-0 w-full h-full">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>

            {/* Loading Text Overlay */}
            {showLoadingText && (
                <div
                    ref={loadingTextRef}
                    style={{ opacity: 0 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-overlay"
                >
                    <div className="text-center">
                        <div className="text-4xl font-thin text-white/80 tabular-nums font-mono">
                            {Math.round(progress)}%
                        </div>
                        <div className="mt-2 text-sm font-light tracking-[0.2em] uppercase text-white/50">
                            Loading
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});

LoadingScreen.displayName = 'LoadingScreen';
