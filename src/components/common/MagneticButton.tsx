import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = '', onClick }) => {
    const magnetic = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const xTo = gsap.quickTo(magnetic.current, "x", { duration: 0.4, ease: "power3.out" });
        const yTo = gsap.quickTo(magnetic.current, "y", { duration: 0.4, ease: "power3.out" });

        const handleMouseMove = (e: MouseEvent) => {
            if (!magnetic.current) return;
            const { clientX, clientY } = e;
            const { height, width, left, top } = magnetic.current.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            xTo(x * 0.25);
            yTo(y * 0.25);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
        };

        if (magnetic.current) {
            magnetic.current.addEventListener("mousemove", handleMouseMove);
            magnetic.current.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if (magnetic.current) {
                magnetic.current.removeEventListener("mousemove", handleMouseMove);
                magnetic.current.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, []);

    return (
        <div ref={magnetic} className={`inline-block cursor-pointer ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};
