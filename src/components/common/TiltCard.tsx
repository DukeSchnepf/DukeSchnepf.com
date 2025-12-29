import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null);
    const quickRotateX = useRef<gsap.QuickToFunc | null>(null);
    const quickRotateY = useRef<gsap.QuickToFunc | null>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Create quickTo functions for smooth spring-like animation
        quickRotateX.current = gsap.quickTo(el, 'rotateX', {
            duration: 0.5,
            ease: 'power2.out',
        });

        quickRotateY.current = gsap.quickTo(el, 'rotateY', {
            duration: 0.5,
            ease: 'power2.out',
        });

        // Set initial transform style
        gsap.set(el, { transformStyle: 'preserve-3d' });

        return () => {
            gsap.killTweensOf(el);
        };
    }, []);

    function handleMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        // Apply rotation (inverted Y for natural feel)
        quickRotateX.current?.(yPct * -20); // Max rotation 20deg
        quickRotateY.current?.(xPct * 20);
    }

    function handleLeave() {
        // Reset rotation to 0
        quickRotateX.current?.(0);
        quickRotateY.current?.(0);
    }

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className={`relative transition-all duration-200 ease-linear ${className}`}
            style={{ transformStyle: 'preserve-3d' }}
        >
            {children}
        </div>
    );
};
