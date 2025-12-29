import JourneySection from './JourneySection';

interface ExperienceProps {
    id?: string;
}

const Experience = ({ id }: ExperienceProps) => {
    return (
        <main id={id}>
            {/* Any other sections you have */}
            <JourneySection />
        </main>
    );
};

export default Experience;