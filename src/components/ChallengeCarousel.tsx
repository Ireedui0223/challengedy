import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChallengeCard from '@/components/ChallengeCard';

interface Challenge {
    id: string;
    title: string;
    badges: string[];
    imageSrc: string;
}

interface FeaturedChallengesProps {
    challenges: Challenge[];
}

const FeaturedChallenges: React.FC<FeaturedChallengesProps> = ({ challenges }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 200; // Adjust based on your card width + gap
            const scrollLeft = direction === 'left'
                ? scrollRef.current.scrollLeft - scrollAmount
                : scrollRef.current.scrollLeft + scrollAmount;

            scrollRef.current.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="mt-6">
            <div className="relative mb-3">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto space-x-3 pb-4 scrollbar-hide"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {challenges.map(challenge => (
                        <div key={challenge.id} className="min-w-[160px] max-w-[160px] relative">
                            <ChallengeCard
                                id={challenge.id}
                                title={challenge.title}
                                badges={challenge.badges}
                                imageSrc={challenge.imageSrc}
                            />
                        </div>
                    ))}
                </div>
                <div className="absolute inset-y-0 left-0 flex items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 p-1 cursor-pointer"
                        onClick={() => scroll('left')}
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center">
                    <Button
                        variant="outline"
                        size="icon"
                        className="w-8 h-8 p-1 cursor-pointer"
                        onClick={() => scroll('right')}
                    >
                        <ChevronRight className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default FeaturedChallenges;