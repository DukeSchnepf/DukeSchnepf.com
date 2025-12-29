import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP Configuration
 * Central configuration for GSAP animation library
 */
export const gsapConfig = {
    init: () => {
        // Register plugins
        gsap.registerPlugin(ScrollTrigger);

        // Set global defaults
        gsap.defaults({
            ease: 'power2.out',
            duration: 0.6,
        });

        // Refresh ScrollTrigger on resize
        window.addEventListener('resize', () => {
            ScrollTrigger.refresh();
        });
    },
};
