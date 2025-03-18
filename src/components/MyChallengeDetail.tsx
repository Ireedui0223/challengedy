import React from 'react';
import { calculateBadge } from '@/lib/utils';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';

interface Challenge {
    id: string;
    title: string;
    badges: string[];
    imageSrc: string;
    status: string;
}


const MyChallengeDetail: React.FC<Challenge> = ({ badges, id, status,
    title
}) => {
    const router = useRouter();
    return (
        <div className="flex justify-between items-center border-b border-gray-100 pb-2"
            onClick={() => router.push(`/challenge/${id}`)}
        >
            <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-amber-100 rounded-md flex items-center justify-center">
                    <Image
                        src={`/badge-icon/${calculateBadge(badges[0])}`}
                        alt="Badge Icon"
                        className="object-fill"
                        height={24}
                        width={24}
                    />
                </div>
                <div>
                    <p className="text-sm font-medium">{title}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                        {badges.map((badge, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{badge}</Badge>
                        ))}
                    </div>
                </div>
            </div>
            <Badge
                variant="outline"
                className={`text-xs ${status.toLowerCase() === 'completed' ? 'text-green-600 bg-green-50' : 'text-blue-600 bg-blue-50'}`}
            >
                {status}
            </Badge>
        </div>
    );
};

export default MyChallengeDetail;