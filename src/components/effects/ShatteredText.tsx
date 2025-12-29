import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ShatteredTextProps {
    text: string;
    className?: string;
    trigger?: boolean;
}

const ShatteredText: React.FC<ShatteredTextProps> = ({ text, className = '', trigger = true }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate shards for each character
    const charShards = useMemo(() => {
        return text.split('').map(() => {
            // Generate cleaner shards (Voronoi-like feel)
            // We'll create 8 shards per character based on a central-ish point
            const shards = [];
            const cx = 50 + (Math.random() - 0.5) * 20; // Center X (40-60%)
            const cy = 50 + (Math.random() - 0.5) * 20; // Center Y (40-60%)

            // Define boundary points clockwise
            const points = [
                { x: 0, y: 0 },
                { x: 50 + (Math.random() - 0.5) * 20, y: 0 }, // Top edge random
                { x: 100, y: 0 },
                { x: 100, y: 50 + (Math.random() - 0.5) * 20 }, // Right edge random
                { x: 100, y: 100 },
                { x: 50 + (Math.random() - 0.5) * 20, y: 100 }, // Bottom edge random
                { x: 0, y: 100 },
                { x: 0, y: 50 + (Math.random() - 0.5) * 20 }  // Left edge random
            ];

            // Create triangles connecting center to adjacent boundary points
            for (let i = 0; i < points.length; i++) {
                const p1 = points[i];
                const p2 = points[(i + 1) % points.length];

                shards.push({
                    clipPath: `polygon(${cx}% ${cy}%, ${p1.x}% ${p1.y}%, ${p2.x}% ${p2.y}%)`,
                });
            }
            return shards;
        });
    }, [text]);

    useGSAP(() => {
        if (!containerRef.current || !trigger) return;

        const chars = containerRef.current.querySelectorAll('.char-container');

        chars.forEach((char, index) => {
            const shards = char.querySelectorAll('.shard-layer');

            // Animate shards for this character
            gsap.fromTo(shards,
                {
                    x: () => (Math.random() - 0.5) * 300, // Large spread
                    y: () => (Math.random() - 0.5) * 300,
                    z: () => (Math.random() - 0.5) * 400, // Deep 3D space
                    rotationX: () => Math.random() * 360,
                    rotationY: () => Math.random() * 360,
                    opacity: 0,
                    scale: () => 0.5 + Math.random(), // Variable scale
                },
                {
                    duration: 1.8, // Slower, more fluid
                    x: 0,
                    y: 0,
                    z: 0,
                    rotationX: 0,
                    rotationY: 0,
                    scale: 1,
                    opacity: 1,
                    delay: index * 0.05, // Slight wave effect
                    stagger: {
                        amount: 1.2, // Random arrival times
                        from: "random"
                    },
                    ease: "power3.out", // Fluid deceleration
                    clearProps: "all"
                }
            );
        });

    }, { scope: containerRef, dependencies: [trigger] });

    return (
        <div
            ref={containerRef}
            className={`inline-block ${className}`}
            style={{ perspective: '1000px' }}
            aria-label={text}
        >
            {text.split('').map((char, i) => (
                <span key={i} className="char-container relative inline-block" style={{ minWidth: char === ' ' ? '0.3em' : 'auto' }}>
                    {/* Invisible spacer for layout */}
                    <span className="opacity-0">{char === ' ' ? '\u00A0' : char}</span>

                    {/* Shard Layers */}
                    {char !== ' ' && charShards[i].map((shard, j) => (
                        <span
                            key={j}
                            className="shard-layer absolute inset-0"
                            style={{
                                clipPath: shard.clipPath,
                                backfaceVisibility: 'hidden',
                                willChange: 'transform, opacity'
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </span>
            ))}
        </div>
    );
};

export default ShatteredText;
