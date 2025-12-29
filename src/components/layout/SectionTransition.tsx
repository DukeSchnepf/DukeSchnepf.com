import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SectionTransitionProps {
    children: React.ReactNode;
    direction?: 'left' | 'right';
    mode?: 'enter' | 'exit';
    axis?: 'x' | 'y';
    triggerId?: string;
    className?: string;
}

export function SectionTransition({
    children,
    direction = 'left',
    mode = 'enter',
    axis = 'y',
    triggerId,
    className = ''
}: SectionTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const width = containerRef.current?.offsetWidth || window.innerWidth;
        const height = containerRef.current?.offsetHeight || window.innerHeight;

        // Calculate Z-origin based on axis
        const zOrigin = axis === 'x' ? -(height / 2) : -(width / 2);

        // Calculate rotation values
        const rotationVal = direction === 'left' ? -90 : 90;

        // Define properties based on axis
        const rotationProp = axis === 'x' ? 'rotationX' : 'rotationY';

        gsap.set(containerRef.current, {
            transformPerspective: 2000,
            transformStyle: "preserve-3d"
        });

        if (mode === 'enter') {
            gsap.fromTo(containerRef.current,
                {
                    opacity: 0,
                    [rotationProp]: rotationVal,
                    transformOrigin: `50% 50% ${zOrigin}px`,
                },
                {
                    opacity: 1,
                    [rotationProp]: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top bottom',
                        end: 'top top',
                        scrub: 1,
                    }
                }
            );
        } else {
            // Exit mode
            // 1. Force initial state immediately
            gsap.set(containerRef.current, {
                opacity: 1,
                [rotationProp]: 0,
                transformOrigin: `50% 50% ${zOrigin}px`,
            });

            // 2. Animate to exit state
            gsap.to(containerRef.current, {
                // opacity: 0, // Removed to fix visibility issue
                [rotationProp]: -rotationVal,
                ease: 'none',
                scrollTrigger: {
                    trigger: triggerId ? `#${triggerId}` : 'section:nth-of-type(2)',
                    start: 'top bottom',
                    end: 'top top',
                    scrub: 1,
                    immediateRender: false
                }
            });
        }
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className={`will-change-transform ${className}`}
            style={{
                perspective: '1000px',
                zIndex: mode === 'exit' ? 10 : 20,
                position: 'relative'
            }}
        >
            <div style={{ transformStyle: 'preserve-3d' }}>
                {children}
            </div>
        </div>
    );
}
