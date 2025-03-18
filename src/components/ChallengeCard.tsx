import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { useRouter } from 'next/navigation';

interface ChallengeCardProps {
    id: string;
    title: string;
    imageSrc?: string | null;
    badges: string[];
}

const ChallengeCard: React.FC<ChallengeCardProps> = ({ id, title, imageSrc, badges }) => {
    const router = useRouter();
    return (
        <Card
            className="overflow-hidden border border-gray-200 py-0 flex flex-col h-60 cursor-pointer relative group"
            onClick={() => router.push(`/challenge/${id}`)}
        >
            <span className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>

            {imageSrc ? (
                <div className="h-5/10 relative">
                    <Image
                        src={imageSrc}
                        alt={title}
                        fill
                        sizes="100%"
                        className="object-fill"
                    />
                </div>
            ) : (
                <div className="bg-gray-100 h-3/5 flex items-center justify-center">
                    <span className="text-gray-400">···</span>
                </div>
            )}

            <CardContent className="p-2 h-5/10 overflow-hidden ">
                <h3 className="text-md font-medium line-clamp-2">{title}</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                    {badges.map((badge, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{badge}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ChallengeCard;