import React, { useState, useEffect, useRef, useCallback, useMemo, memo } from 'react';
import {
    Briefcase,
    GraduationCap,
    Code,
    Terminal,
    Cpu,
    Globe,
    Calendar,
    ExternalLink,
    ChevronDown,
    LucideIcon,
} from 'lucide-react';

// --- Type Definitions ---
type Category = 'tech' | 'education' | 'work' | 'community' | 'award';

interface JourneyItem {
    id: number;
    year: string;
    title: string;
    company: string;
    description: string;
    details: string;
    tags: string[];
    category: Category;
    link: string;
}

interface CategoryOption {
    id: Category | 'all';
    label: string;
}

interface TimelineIconProps {
    category: Category;
}

interface TagProps {
    label: string;
}

interface TagListProps {
    tags: string[];
}

interface ExpandedContentProps {
    details: string;
    isExpanded: boolean;
}

interface TimelineCardProps {
    item: JourneyItem;
    isLeft: boolean;
    isExpanded: boolean;
    onToggle: () => void;
}

interface FilterBarProps {
    filter: Category | 'all';
    onFilterChange: (filter: Category | 'all') => void;
}

// --- Data Configuration ---
const journeyData: JourneyItem[] = [
    {
        id: 1,
        year: '2024 - Present',
        title: 'AI Fellowship',
        company: 'Code/Day C2C',
        description: 'Developing AI-driven solutions and contributing to open-source projects within a collaborative fellowship environment.',
        details: 'Led a team of 4 to build a predictive model for wildfire spread using satellite imagery. Implemented a custom CNN architecture in PyTorch achieving 92% accuracy. Conducted weekly code reviews and mentored junior fellows in Python best practices.',
        tags: ['Machine Learning', 'Open Source', 'Python', 'TensorFlow'],
        category: 'tech',
        link: '#'
    },
    {
        id: 2,
        year: '2023 - Present',
        title: 'Tech Fellow',
        company: 'Mentors in Tech Program',
        description: 'Collaborating with industry mentors to enhance software engineering skills and build professional networks.',
        details: 'Participated in intensive system design workshops. Built a microservices-based e-commerce backend using Go and gRPC. Optimized database queries reducing latency by 40%.',
        tags: ['Mentorship', 'Career Dev', 'Networking', 'Agile'],
        category: 'community',
        link: '#'
    },
    {
        id: 3,
        year: '2023',
        title: 'Full Stack Developer',
        company: 'Freelance',
        description: 'Delivering custom web solutions for clients, focusing on performance, accessibility, and responsive design.',
        details: 'Developed a custom inventory management system for a local logistics company using React and Firebase. Integrated Stripe API for payments and SendGrid for automated notifications. Achieved a 100/100 Lighthouse performance score.',
        tags: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
        category: 'work',
        link: '#'
    },
    {
        id: 4,
        year: '2022',
        title: 'Hackathon Winner',
        company: 'Global Tech Summit',
        description: 'Secured 1st place out of 500+ participants. Developed a real-time sign language translation app.',
        details: 'Built the frontend using React Native to ensure mobile accessibility. Integrated Google MediaPipe for hand tracking. Pitched the solution to a panel of judges from Google and Microsoft.',
        tags: ['Computer Vision', 'Innovation', 'Public Speaking'],
        category: 'award',
        link: '#'
    },
    {
        id: 5,
        year: '2019 - 2023',
        title: 'B.S. Computer Science',
        company: 'University of Tech',
        description: 'Specialized in Human-Computer Interaction. Dean\'s List for 6 consecutive semesters.',
        details: 'Completed coursework in Data Structures, Algorithms, Operating Systems, and Distributed Systems. Served as a Teaching Assistant for Intro to Java. Capstone project: "Eye-tracking interface for paralyzed patients".',
        tags: ['Algorithms', 'Data Structures', 'HCI', 'Research'],
        category: 'education',
        link: '#'
    }
];

const CATEGORY_ICONS: Record<Category | 'default', LucideIcon> = {
    tech: Cpu,
    education: GraduationCap,
    work: Briefcase,
    community: Globe,
    award: Terminal,
    default: Code,
};

const CATEGORIES: CategoryOption[] = [
    { id: 'all', label: 'All Logs' },
    { id: 'tech', label: 'Engineering' },
    { id: 'work', label: 'Work' },
    { id: 'education', label: 'Education' },
    { id: 'award', label: 'Awards' }
];

// --- Memoized Sub-Components ---

const TimelineIcon = memo<TimelineIconProps>(({ category }) => {
    const IconComponent = CATEGORY_ICONS[category] || CATEGORY_ICONS.default;
    return <IconComponent size={20} />;
});
TimelineIcon.displayName = 'TimelineIcon';

const Tag = memo<TagProps>(({ label }) => (
    <span className="inline-block px-3 py-1 mr-2 mb-2 text-xs font-mono text-amber-500 bg-amber-950/30 border border-amber-900/50 rounded-md hover:bg-amber-900/50 hover:text-amber-400 transition-colors cursor-default">
        {label}
    </span>
));
Tag.displayName = 'Tag';

const TagList = memo<TagListProps>(({ tags }) => (
    <div className="flex flex-wrap pt-2 w-full">
        {tags.map((tag) => <Tag key={tag} label={tag} />)}
    </div>
));
TagList.displayName = 'TagList';

const ExpandedContent = memo<ExpandedContentProps>(({ details, isExpanded }) => (
    <div className={`grid transition-all duration-500 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 mb-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
            <div className="bg-black/30 p-4 rounded-lg border border-zinc-800 font-mono text-sm">
                <div className="text-amber-500/70 mb-2 text-xs uppercase tracking-widest">// Command Log</div>
                <p className="text-zinc-300">{details}</p>
            </div>
        </div>
    </div>
));
ExpandedContent.displayName = 'ExpandedContent';

const TimelineCard = memo<TimelineCardProps>(({ item, isLeft, isExpanded, onToggle }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const node = cardRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '50px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const expandedClass = isExpanded
        ? 'border-amber-500/60 shadow-[0_0_30px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/20'
        : 'border-zinc-800 hover:border-amber-500/50 hover:shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1';

    const nodeExpandedClass = isExpanded
        ? 'text-zinc-950 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.6)] scale-110'
        : 'border-amber-500/50 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]';

    const cornerClass = isExpanded ? 'border-amber-500' : 'border-zinc-700 group-hover:border-amber-500/50';

    return (
        <div
            ref={cardRef}
            data-timeline-card
            className={`relative flex items-center justify-between md:justify-center mb-16 w-full transition-opacity duration-700 ease-out will-change-transform ${isVisible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            {/* Timeline Node */}
            <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-2 z-20 transition-all duration-300 bg-zinc-950 ${nodeExpandedClass}`}>
                <div className={isExpanded ? 'text-amber-500' : ''}>
                    <TimelineIcon category={item.category} />
                </div>
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isLeft ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                <div
                    onClick={onToggle}
                    className={`group relative bg-zinc-900/80 backdrop-blur-sm border rounded-xl p-6 transition-all duration-300 cursor-pointer ${expandedClass}`}
                >
                    {/* Corner Accents */}
                    <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors rounded-tl-xl ${cornerClass}`} />
                    <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r transition-colors rounded-tr-xl ${cornerClass}`} />
                    <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l transition-colors rounded-bl-xl ${cornerClass}`} />
                    <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors rounded-br-xl ${cornerClass}`} />

                    {/* Header */}
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-4 justify-end">
                        <Calendar size={12} />
                        <span>{item.year}</span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-white font-mono mb-1 tracking-tight">
                        {item.title}
                    </h3>
                    <div className="text-amber-500 font-medium mb-4 flex items-center gap-2">
                        <span>{item.company}</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 border-l-2 border-zinc-800 pl-4 group-hover:border-amber-500/30 transition-colors">
                        {item.description}
                    </p>

                    <ExpandedContent details={item.details} isExpanded={isExpanded} />

                    <div className="flex justify-between items-end">
                        <TagList tags={item.tags} />
                        <div className={`text-zinc-600 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180 text-amber-500' : 'group-hover:text-amber-500'}`}>
                            <ChevronDown size={20} />
                        </div>
                    </div>

                    {/* Arrow Pointer */}
                    <div
                        className={`hidden md:block absolute top-10 w-4 h-4 bg-zinc-900 border-t border-r transition-colors rotate-45 ${isExpanded ? 'border-amber-500/60 bg-zinc-900' : 'border-zinc-800 group-hover:border-amber-500/50'
                            } ${isLeft ? '-right-2.5 border-l-0 border-b-0' : '-left-2.5 border-t-0 border-r-0 border-b border-l'
                            }`}
                    />
                </div>
            </div>
        </div>
    );
});
TimelineCard.displayName = 'TimelineCard';

const FilterBar = memo<FilterBarProps>(({ filter, onFilterChange }) => (
    <div className="inline-flex flex-wrap justify-center gap-2 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800 backdrop-blur-sm">
        {CATEGORIES.map(cat => (
            <button
                key={cat.id}
                onClick={() => onFilterChange(cat.id)}
                className={`px-4 py-2 rounded-lg text-sm font-mono transition-all duration-300 ${filter === cat.id
                    ? 'bg-amber-500 text-zinc-950 font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
            >
                {cat.label}
            </button>
        ))}
    </div>
));
FilterBar.displayName = 'FilterBar';

// --- Custom Hook for Scroll Animation ---
const useScrollAnimation = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    lineRef: React.RefObject<HTMLDivElement | null>,
    enabled: boolean
): void => {
    const rafId = useRef<number | null>(null);
    const ticking = useRef<boolean>(false);

    useEffect(() => {
        if (!enabled) return;

        const updateAnimation = (): void => {
            const container = containerRef.current;
            const line = lineRef.current;

            if (!container || !line) {
                ticking.current = false;
                return;
            }

            const windowHeight = window.innerHeight;
            const { top, height: containerHeight } = container.getBoundingClientRect();

            // Line animation - use center of viewport as target
            const targetPoint = windowHeight * 0.5;
            const scrollDist = Math.min(Math.max(targetPoint - top, 0), containerHeight);
            line.style.height = `${scrollDist}px`;

            // Parallax cards - batch DOM reads then writes
            const cards = container.querySelectorAll<HTMLElement>('[data-timeline-card]');
            const transforms: number[] = [];

            // Read phase
            cards.forEach((card) => {
                const rect = card.getBoundingClientRect();
                const distanceFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
                transforms.push(distanceFromCenter * -0.05);
            });

            // Write phase
            cards.forEach((card, i) => {
                card.style.transform = `translateY(${transforms[i]}px)`;
            });

            ticking.current = false;
        };

        const handleScroll = (): void => {
            if (!ticking.current) {
                ticking.current = true;
                rafId.current = requestAnimationFrame(updateAnimation);
            }
        };

        // Initial call
        updateAnimation();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [containerRef, lineRef, enabled]);
};

// --- Main Section Component ---
const JourneySection: React.FC = () => {
    const [filter, setFilter] = useState<Category | 'all'>('all');
    const [expandedId, setExpandedId] = useState<number | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);

    const filteredData = useMemo<JourneyItem[]>(() =>
        filter === 'all'
            ? journeyData
            : journeyData.filter(item => item.category === filter),
        [filter]
    );

    const handleFilterChange = useCallback((newFilter: Category | 'all'): void => {
        setFilter(newFilter);
        setExpandedId(null);
    }, []);

    const handleToggle = useCallback((id: number): void => {
        setExpandedId(prev => prev === id ? null : id);
    }, []);

    // Use custom scroll animation hook
    useScrollAnimation(containerRef, lineRef, filteredData.length > 0);

    return (
        <section className="bg-zinc-950 py-24 relative overflow-hidden min-h-screen">
            {/* Background Grid Pattern */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(39,39,42,0.5) 0%, rgba(9,9,11,0.9) 70%)'
                }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">

                {/* Section Header */}
                <header className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-white font-mono tracking-tighter uppercase mb-4">
                        Journey<span className="text-amber-500">.</span>
                    </h2>
                    <div className="h-1 w-24 bg-amber-500 mx-auto rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] mb-6" />
                    <FilterBar filter={filter} onFilterChange={handleFilterChange} />
                </header>

                {/* Timeline Container */}
                <div ref={containerRef} className="relative max-w-5xl mx-auto min-h-[500px]">
                    {/* Vertical Spine Line (Background) */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-800 transform md:-translate-x-1/2" />

                    {/* Vertical Spine Line (Active/Scrolling) */}
                    <div
                        ref={lineRef}
                        className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-amber-500 via-amber-400 to-amber-600 transform md:-translate-x-1/2 shadow-[0_0_15px_rgba(245,158,11,0.6)] z-10 origin-top"
                        style={{ height: 0 }}
                    >
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-amber-300 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    </div>

                    {/* Items */}
                    <div className="space-y-4 pb-20">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
                                <TimelineCard
                                    key={item.id}
                                    item={item}
                                    isLeft={index % 2 === 0}
                                    isExpanded={expandedId === item.id}
                                    onToggle={() => handleToggle(item.id)}
                                />
                            ))
                        ) : (
                            <div className="text-center py-20 animate-pulse">
                                <p className="text-zinc-500 font-mono text-lg">No logs found for this protocol.</p>
                            </div>
                        )}
                    </div>

                    {/* End Node */}
                    <div className="absolute -bottom-4 left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-zinc-950 border-2 border-amber-500 rounded-full z-20" />
                </div>
            </div>
        </section>
    );
};

export default JourneySection;