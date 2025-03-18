import React from 'react';
import MyChallengeDetail from './MyChallengeDetail';
import { Card, CardContent } from './ui/card';
import { Challenge } from '@/app/context/ChallengeContext';


interface myChallengesProps {
    challenges: Challenge[];
}

const MyChallenges: React.FC<myChallengesProps> = ({ challenges }) => {
    console.log(challenges,
        challenges
    )
    return (
        <section className="mt-6">
            <Card>
                <CardContent className="p-3">
                    <div className="space-y-3">
                        {challenges.map(challenge => (
                            <MyChallengeDetail
                                key={challenge.id}
                                id={challenge.id}
                                title={challenge.title}
                                badges={challenge.badges}
                                imageSrc={challenge.imageSrc}
                                status={challenge.status ?? 'pending'}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

        </section>
    );
};
export default MyChallenges;