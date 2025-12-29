import { useMemo, useState } from 'react';

interface CSSStarFieldProps {
    experienceStarted?: boolean;
}

export function CSSStarField({ experienceStarted = false }: CSSStarFieldProps) {
    const [showSpaceText, setShowSpaceText] = useState(false);
    const generateBoxShadow = (n: number) => {
        const randomX = () => Math.random() * 5000;
        const randomY = () => Math.random() * 2000;

        let value = `${randomX()}px ${randomY()}px #FFF`;
        for (let i = 2; i <= n; i++) {
            value += `, ${randomX()}px ${randomY()}px #FFF`;
        }
        return value;
    };

    const shadowsSmall = useMemo(() => generateBoxShadow(700), []);
    const shadowsMedium = useMemo(() => generateBoxShadow(200), []);
    const shadowsBig = useMemo(() => generateBoxShadow(100), []);
    const shadowsTwinkle1 = useMemo(() => generateBoxShadow(50), []);
    const shadowsTwinkle2 = useMemo(() => generateBoxShadow(50), []);

    return (
        <>
            {/* Moon, Flag, and UFO - Absolute positioning to scroll with page */}
            <div className="absolute top-4 right-4 w-40 h-40 md:top-10 md:right-10 md:w-64 md:h-64 pointer-events-none" style={{ zIndex: 10 }}>
                {/* Moon Glow */}
                <div className="absolute inset-0 rounded-full bg-yellow-50/5 blur-3xl" />
                <div className="absolute -inset-4 rounded-full bg-yellow-50/2 blur-2xl" />

                {/* Moon Surface */}
                <div
                    className="absolute inset-0 rounded-full overflow-hidden z-10"
                    style={{
                        background: 'radial-gradient(circle at 30% 30%, #fffff7 0%, #f5f5f0 50%, #57534e 100%)',
                        boxShadow: 'inset -20px -20px 50px rgba(0,0,0,0.5), 0 0 20px rgba(255, 255, 240, 0.15)'
                    }}
                >
                    <div className="absolute top-[20%] left-[25%] w-[15%] h-[15%] rounded-full bg-[#d1d5db] opacity-80 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]" />
                    <div className="absolute top-[45%] left-[60%] w-[25%] h-[25%] rounded-full bg-[#9ca3af] opacity-60 shadow-[inset_3px_3px_6px_rgba(0,0,0,0.5)]" />
                    <div className="absolute top-[65%] left-[30%] w-[10%] h-[10%] rounded-full bg-[#9ca3af] opacity-70 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.4)]" />
                    <div className="absolute top-[15%] left-[65%] w-[8%] h-[8%] rounded-full bg-[#d1d5db] opacity-50 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.3)]" />
                    <div className="absolute bottom-[20%] right-[35%] w-[12%] h-[12%] rounded-full bg-[#9ca3af] opacity-60 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]" />
                </div>

                {/* Interactive Flag - Positioned on edge of moon at top, tilted left */}
                <div
                    className="absolute -top-[5%] left-[28%] z-20 w-8 h-12 flex flex-col items-center justify-end pointer-events-auto cursor-pointer group"
                    style={{ transform: 'rotate(-15deg)', transformOrigin: 'bottom center' }}
                    onClick={() => setShowSpaceText(!showSpaceText)}
                >
                    {/* Exclamation Mark - Floating and swaying above flag, stays level */}
                    {experienceStarted && (
                        <div
                            className="absolute -top-2 left-1/2 text-red-500 text-xl font-bold drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-float-sway"
                            style={{ transform: 'translateX(-50%) rotate(15deg)' }}
                        >
                            !
                        </div>
                    )}

                    {/* Flag Structure */}
                    <div className="relative">
                        {/* Pole */}
                        <div className="h-8 w-0.5 bg-gray-300 mx-auto rounded-full shadow-[1px_1px_2px_rgba(0,0,0,0.5)]" />
                        {/* Banner - Animated waving */}
                        <div className="absolute top-0 left-1/2 w-5 h-3 bg-gradient-to-r from-red-600 to-red-500 origin-left animate-flag-wave shadow-sm rounded-sm" />
                    </div>

                    {/* Text Box */}
                    {showSpaceText && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-3 bg-black/90 border border-white/10 rounded-xl backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] text-center z-50 animate-in fade-in zoom-in duration-200">
                            <h3 className="text-white text-[10px] font-bold mb-1 tracking-[0.2em] uppercase text-blue-200">SPACE THE FINAL FRONTIER</h3>
                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />
                            <p className="text-gray-400 text-[9px] leading-relaxed font-light italic">Inspired by the nightsky in my backyard</p>
                        </div>
                    )}
                </div>

                {/* Fixed UFO - Orbits around the moon */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="ufo-wrapper w-full h-full">
                        <div className="ufo-axis-x">
                            <div className="ufo-axis-y">
                                <div className="ufo-axis-scale">
                                    <div className="ufo-ship" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_#1B2735_0%,_#090A0F_100%)]">
                {/* Background Stars Layer */}
                <div className="absolute inset-0" style={{ zIndex: 1 }}>
                    <div
                        id="stars"
                        className="absolute w-[1px] h-[1px] bg-transparent animate-animStar"
                        style={{
                            boxShadow: shadowsSmall,
                            animationDuration: '50s',
                        }}
                    >
                        <div
                            className="absolute top-[2000px] w-[1px] h-[1px] bg-transparent"
                            style={{ boxShadow: shadowsSmall }}
                        />
                    </div>

                    <div
                        id="stars2"
                        className="absolute w-[2px] h-[2px] bg-transparent animate-animStar"
                        style={{
                            boxShadow: shadowsMedium,
                            animationDuration: '100s',
                        }}
                    >
                        <div
                            className="absolute top-[2000px] w-[2px] h-[2px] bg-transparent"
                            style={{ boxShadow: shadowsMedium }}
                        />
                    </div>

                    <div
                        id="stars3"
                        className="absolute w-[3px] h-[3px] bg-transparent animate-animStar"
                        style={{
                            boxShadow: shadowsBig,
                            animationDuration: '150s',
                        }}
                    >
                        <div
                            className="absolute top-[2000px] w-[3px] h-[3px] bg-transparent"
                            style={{ boxShadow: shadowsBig }}
                        />
                    </div>

                    {/* Twinkling Stars */}
                    <div
                        className="absolute w-[2px] h-[2px] bg-transparent animate-twinkle"
                        style={{
                            boxShadow: shadowsTwinkle1,
                            animationDuration: '3s',
                        }}
                    />
                    <div
                        className="absolute w-[3px] h-[3px] bg-transparent animate-twinkle"
                        style={{
                            boxShadow: shadowsTwinkle2,
                            animationDuration: '5s',
                            animationDelay: '1s',
                        }}
                    />
                </div>

                {/* Foreground Layer (Shooting Stars, Clouds) */}
                <div className="absolute inset-0" style={{ zIndex: 2 }}>
                    {/* Shooting Stars */}
                    <div className="absolute inset-0 pointer-events-none">
                        {
                            [...Array(5)].map((_, i) => {
                                const topOffset = 10 + Math.random() * 50;
                                const leftOffset = 10 + Math.random() * 80;
                                const duration = 3 + Math.random() * 2;
                                const delay = i * 2;

                                return (
                                    <div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            top: `${topOffset}%`,
                                            left: `${leftOffset}%`,
                                        }}
                                    >
                                        <div
                                            className="w-1 h-1 bg-white rounded-full"
                                            style={{
                                                boxShadow: '0 0 6px 2px rgba(255, 255, 255, 0.8)',
                                                animation: `shooting-star ${duration}s ease-out infinite`,
                                                animationDelay: `${delay}s`,
                                                opacity: 0,
                                            }}
                                        >
                                            <div
                                                className="absolute top-1/2 -translate-y-1/2 w-[200px] h-[2px]"
                                                style={{
                                                    background: 'linear-gradient(90deg, rgba(207, 218, 113, 0.8), transparent)',
                                                    filter: 'blur(1px)',
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>

                    {/* Clouds */}
                    <div className="clouds pointer-events-none" style={{ zIndex: 15 }} />
                </div>
            </div>
        </>
    );
}