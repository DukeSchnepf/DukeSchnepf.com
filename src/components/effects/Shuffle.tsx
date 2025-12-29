import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ShuffleProps {
    text: string;
    tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
    className?: string;
    duration?: number;
    shuffleDirection?: 'left' | 'right' | 'center';
    animationMode?: 'evenodd' | 'random';
    shuffleTimes?: number;
    ease?: string;
    stagger?: number;
    threshold?: number;
    triggerOnce?: boolean;
    triggerOnHover?: boolean;
    respectReducedMotion?: boolean;
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~';

const Shuffle: React.FC<ShuffleProps> = ({
    text,
    tag: Tag = 'div',
    className = '',
    duration = 0.5,
    triggerOnHover = true,
    triggerOnce = false,
}) => {
    const [displayText, setDisplayText] = useState(text);
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);
    const frameRef = useRef<number>(0);
    const startTimeRef = useRef<number>(0);

    const animate = useCallback(() => {
        setIsAnimating(true);
        startTimeRef.current = Date.now();
        const durationMs = duration * 1000;

        const update = () => {
            const now = Date.now();
            const elapsed = now - startTimeRef.current;
            const progress = Math.min(elapsed / durationMs, 1);

            if (progress < 1) {
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    if (i < text.length * progress) {
                        result += text[i];
                    } else {
                        result += CHARS[Math.floor(Math.random() * CHARS.length)];
                    }
                }
                setDisplayText(result);
                frameRef.current = requestAnimationFrame(update);
            } else {
                setDisplayText(text);
                setIsAnimating(false);
                if (triggerOnce) setHasTriggered(true);
            }
        };

        frameRef.current = requestAnimationFrame(update);
    }, [text, duration, triggerOnce]);

    useEffect(() => {
        // Initial animation
        animate();
        return () => cancelAnimationFrame(frameRef.current);
    }, [animate]);

    const handleMouseEnter = () => {
        if (triggerOnHover && !isAnimating && (!triggerOnce || !hasTriggered)) {
            animate();
        }
    };

    // Dynamic tag creation
    const Component = Tag as any;

    return (
        <Component
            className={className}
            onMouseEnter={handleMouseEnter}
            aria-label={text}
        >
            {displayText}
        </Component>
    );
};

export default Shuffle;
