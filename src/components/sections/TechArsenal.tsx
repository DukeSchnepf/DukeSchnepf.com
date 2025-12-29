import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

// Types
interface Skill {
  name: string;
  icon: string;
  color: string;
}

interface TechArsenalProps {
  id?: string;
}

type CategoryKey = 'frontend' | 'backend' | 'database' | 'devops' | 'ai';

// Skills Data
const skills: Record<CategoryKey, Skill[]> = {
  frontend: [
    { name: 'React', icon: '⚛️', color: '#61DAFB' },
    { name: 'Tailwind', icon: '🎨', color: '#38BDF8' },
    { name: 'JavaScript', icon: '⚡', color: '#F7DF1E' },
    { name: 'TypeScript', icon: '💎', color: '#3178C6' },
    { name: 'CSS3', icon: '🎭', color: '#E34F26' },
    { name: 'HTML5', icon: '📄', color: '#E34F26' },
    { name: 'Vue.js', icon: '💚', color: '#4FC08D' },
    { name: 'SASS', icon: '🔥', color: '#CC6699' },
  ],
  backend: [
    { name: 'Python', icon: '🐍', color: '#3776AB' },
    { name: 'Node.js', icon: '🟢', color: '#339933' },
    { name: 'Express', icon: '🚂', color: '#ffffff' },
    { name: 'Django', icon: '🎸', color: '#092E20' },
    { name: 'FastAPI', icon: '⚡', color: '#009688' },
    { name: 'Java', icon: '☕', color: '#ED8B00' },
  ],
  database: [
    { name: 'SQL', icon: '🗃️', color: '#4479A1' },
    { name: 'PostgreSQL', icon: '🐘', color: '#336791' },
    { name: 'MongoDB', icon: '🍃', color: '#47A248' },
    { name: 'Redis', icon: '🔴', color: '#DC382D' },
    { name: 'Firebase', icon: '🔥', color: '#FFCA28' },
  ],
  devops: [
    { name: 'Docker', icon: '🐳', color: '#2496ED' },
    { name: 'AWS', icon: '☁️', color: '#FF9900' },
    { name: 'Git', icon: '📦', color: '#F05032' },
    { name: 'Linux', icon: '🐧', color: '#FCC624' },
    { name: 'Nginx', icon: '🌐', color: '#009639' },
  ],
  ai: [
    { name: 'TensorFlow', icon: '🧠', color: '#FF6F00' },
    { name: 'PyTorch', icon: '🔥', color: '#EE4C2C' },
    { name: 'Pandas', icon: '🐼', color: '#150458' },
    { name: 'NumPy', icon: '🔢', color: '#013243' },
    { name: 'Scikit-learn', icon: '📊', color: '#F7931E' },
  ],
};

const categories: { id: 'all' | CategoryKey; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'database', label: 'Database' },
  { id: 'devops', label: 'DevOps' },
  { id: 'ai', label: 'AI & Data' },
];

const categoryLabels: Record<CategoryKey, string> = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  database: 'Database Systems',
  devops: 'DevOps & Cloud',
  ai: 'AI & Data Science',
};

const categoryColors: Record<CategoryKey, string> = {
  frontend: '#38BDF8',
  backend: '#4ADE80',
  database: '#FBBF24',
  devops: '#A78BFA',
  ai: '#F472B6',
};

export default function TechArsenal({ id }: TechArsenalProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | CategoryKey>('all');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      );

      if (filtersRef.current) {
        gsap.fromTo(
          filtersRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);

    gsap.fromTo(
      cards,
      { opacity: 0, y: 40, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'back.out(1.7)',
      }
    );
  }, [activeFilter]);

  const handleCardHover = (index: number, isEntering: boolean) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      scale: isEntering ? 1.05 : 1,
      y: isEntering ? -8 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const getFilteredSkills = (): [CategoryKey, Skill[]][] => {
    if (activeFilter === 'all') {
      return Object.entries(skills) as [CategoryKey, Skill[]][];
    }
    return [[activeFilter, skills[activeFilter]]];
  };

  let cardIndex = 0;

  return (
    <section
      id={id}
      ref={containerRef}
      className="min-h-screen py-20 px-4 md:px-10 lg:px-16"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0f0f1a 100%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <h2
          ref={headerRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-10 tracking-tight"
          style={{
            background: 'linear-gradient(135deg, #fff 0%, #a0a0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Technical Arsenal
        </h2>

        {/* Filter Tabs */}
        <div
          ref={filtersRef}
          className="flex gap-3 mb-14 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`
                px-6 py-3 rounded-full text-sm font-medium cursor-pointer
                transition-all duration-300 backdrop-blur-md border-none
                ${activeFilter === cat.id
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {getFilteredSkills().map(([category, skillList]) => (
          <div key={category} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: categoryColors[category],
                  boxShadow: `0 0 20px ${categoryColors[category]}`,
                }}
              />
              <h3 className="text-xl font-semibold text-white/90">
                {categoryLabels[category]}
              </h3>
              <span className="text-sm text-white/40 ml-auto">
                {skillList.length}
              </span>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {skillList.map((skill) => {
                const currentIndex = cardIndex++;
                return (
                  <div
                    key={skill.name}
                    ref={(el) => { cardsRef.current[currentIndex] = el; }}
                    onMouseEnter={() => handleCardHover(currentIndex, true)}
                    onMouseLeave={() => handleCardHover(currentIndex, false)}
                    className="
                      bg-white/[0.03] rounded-2xl py-7 px-5
                      flex flex-col items-center gap-3.5
                      cursor-pointer border border-white/[0.06]
                      relative overflow-hidden
                      transition-all duration-300
                    "
                    style={{
                      ['--glow-color' as string]: skill.color,
                    }}
                    onMouseOver={(e) => {
                      const target = e.currentTarget;
                      target.style.borderColor = `${skill.color}40`;
                      target.style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 60px ${skill.color}15`;
                    }}
                    onMouseOut={(e) => {
                      const target = e.currentTarget;
                      target.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                      target.style.boxShadow = 'none';
                    }}
                  >
                    {/* Glow effect */}
                    <div
                      className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] pointer-events-none"
                      style={{
                        background: `radial-gradient(circle at center, ${skill.color}08 0%, transparent 70%)`,
                      }}
                    />

                    <span className="text-4xl relative z-10">{skill.icon}</span>
                    <span className="text-sm font-medium text-white/85 relative z-10">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}




