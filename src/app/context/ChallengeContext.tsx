'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Challenge Data Type
export interface Challenge {
    id: string;
    title: string;
    badges: string[];
    imageSrc: string;
    status?: string | null;
}

// Context Type
interface ChallengesContextType {
    featuredChallenges: Challenge[];
    trendingChallenges: Challenge[];
    myChallenges: Challenge[];
    userCreatedChallenges: Challenge[];
    allChallenges: Challenge[];
    setUserCreatedChallenges: React.Dispatch<React.SetStateAction<Challenge[]>>;
}

// Create Context
const ChallengesContext = createContext<ChallengesContextType | undefined>(undefined);

// Challenge Provider Component
export const ChallengesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userCreatedChallenges, setUserCreatedChallenges] = useState<Challenge[]>([]);

    useEffect(() => {
        // Load user-created challenges from localStorage
        const savedChallenges = localStorage.getItem('userCreatedChallenges');
        if (savedChallenges) {
            setUserCreatedChallenges(JSON.parse(savedChallenges));
        }
    }, []);

    const allChallenges: Challenge[] = [
        {
            id: '1',
            title: '30-day fitness challenge',
            badges: ['Fitness', 'Health'],
            imageSrc: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/30-days-workout-challenge-thumbnail-design-template-b64a264552908a8eb3ef5a0aed39d0d3_screen.jpg?ts=1709717477'
        },
        {
            id: '2',
            title: '30-day creativity challenge',
            badges: ['Creativity', 'Art'],
            imageSrc: "https://www.shutterstock.com/image-illustration/30-day-challenge-stylized-phrase-260nw-1613968273.jpg"
        },
        {
            id: '3',
            title: 'Yearly vision board challenge',
            badges: ['Lifestyle', 'Personal Growth', 'Art'],
            imageSrc: 'https://www.founderjar.com/wp-content/uploads/2021/06/Online-Vision-Board-Apps-Makers-and-Websites1.jpg'
        },
        {
            id: '4',
            title: '30-day photography',
            badges: ['Creativity', 'Art'],
            imageSrc: "https://static.skillshare.com/uploads/video/thumbnails/0845ced88a932d74fbc99333cda0402d/original"
        },
        {
            id: '5',
            title: 'Book-reading',
            badges: ['Personal Growth', 'Lifestyle'],
            imageSrc: 'https://cdn.create.vista.com/downloads/14cd537d-b0ea-4df6-8e31-2be82f0afd95_1024.jpeg'
        },
        {
            id: '6',
            title: 'Daily gratitude',
            badges: ['Personal Growth', 'Health'],
            imageSrc: "https://www.norli.no/media/catalog/product/9/7/9781800078307_1.jpg?auto=webp&format=pjpg&width=728&height=910&fit=cover"
        },
        {
            id: '7',
            title: 'Daily kindness',
            badges: ['Personal Growth', 'Health'],
            imageSrc: 'https://images.randomhouse.com/cover/9781426218446'
        },
        {
            id: '8',
            title: 'Healthy lunch',
            badges: ['Health', 'Lifestyle'],
            imageSrc: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/quick-chicken-and-hummus-bowl-3863168.jpg"
        },
        {
            id: '9',
            title: 'Book-reading',
            badges: ['Personal Growth', 'Lifestyle'],
            imageSrc: 'https://cdn.create.vista.com/downloads/14cd537d-b0ea-4df6-8e31-2be82f0afd95_1024.jpeg',
            status: 'Completed'
        },
        {
            id: '10',
            title: 'Daily gratitude',
            badges: ['Personal Growth', 'Health'],
            imageSrc: "https://www.norli.no/media/catalog/product/9/7/9781800078307_1.jpg?auto=webp&format=pjpg&width=728&height=910&fit=cover",
            status: 'In Progress'
        },
        {
            id: '11',
            title: 'Yearly vision board challenge',
            badges: ['Lifestyle', 'Personal Growth', 'Art'],
            imageSrc: 'https://www.founderjar.com/wp-content/uploads/2021/06/Online-Vision-Board-Apps-Makers-and-Websites1.jpg',
            status: 'Completed'
        },
        {
            id: '12',
            title: '30-day photography',
            badges: ['Creativity', 'Art'],
            imageSrc: "https://static.skillshare.com/uploads/video/thumbnails/0845ced88a932d74fbc99333cda0402d/original",
            status: 'In Progress'
        }
    ]

    const featuredChallenges: Challenge[] = [
        {
            id: '1',
            title: '30-day fitness challenge',
            badges: ['Fitness', 'Health'],
            imageSrc: 'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/30-days-workout-challenge-thumbnail-design-template-b64a264552908a8eb3ef5a0aed39d0d3_screen.jpg?ts=1709717477'
        },
        {
            id: '2',
            title: '30-day creativity challenge',
            badges: ['Creativity', 'Art'],
            imageSrc: "https://www.shutterstock.com/image-illustration/30-day-challenge-stylized-phrase-260nw-1613968273.jpg"
        },
        {
            id: '3',
            title: 'Yearly vision board challenge',
            badges: ['Lifestyle', 'Personal Growth', 'Art'],
            imageSrc: 'https://www.founderjar.com/wp-content/uploads/2021/06/Online-Vision-Board-Apps-Makers-and-Websites1.jpg'
        },
        {
            id: '4',
            title: '30-day photography',
            badges: ['Creativity', 'Art'],
            imageSrc: "https://static.skillshare.com/uploads/video/thumbnails/0845ced88a932d74fbc99333cda0402d/original"
        }
    ];

    const trendingChallenges: Challenge[] = [
        {
            id: '5',
            title: 'Book-reading',
            badges: ['Personal Growth', 'Lifestyle'],
            imageSrc: 'https://cdn.create.vista.com/downloads/14cd537d-b0ea-4df6-8e31-2be82f0afd95_1024.jpeg'
        },
        {
            id: '6',
            title: 'Daily gratitude',
            badges: ['Personal Growth', 'Health'],
            imageSrc: "https://www.norli.no/media/catalog/product/9/7/9781800078307_1.jpg?auto=webp&format=pjpg&width=728&height=910&fit=cover"
        },
        {
            id: '7',
            title: 'Daily kindness',
            badges: ['Personal Growth', 'Health'],
            imageSrc: 'https://images.randomhouse.com/cover/9781426218446'
        },
        {
            id: '8',
            title: 'Healthy lunch',
            badges: ['Health', 'Lifestyle'],
            imageSrc: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/quick-chicken-and-hummus-bowl-3863168.jpg"
        }
    ];

    const myChallenges: Challenge[] = [
        {
            id: '19',
            title: 'Book-reading',
            badges: ['Personal Growth', 'Lifestyle'],
            imageSrc: 'https://cdn.create.vista.com/downloads/14cd537d-b0ea-4df6-8e31-2be82f0afd95_1024.jpeg',
            status: 'Completed'
        },
        {
            id: '10',
            title: 'Daily gratitude',
            badges: ['Personal Growth', 'Health'],
            imageSrc: "https://www.norli.no/media/catalog/product/9/7/9781800078307_1.jpg?auto=webp&format=pjpg&width=728&height=910&fit=cover",
            status: 'In Progress'
        },
        {
            id: '11',
            title: 'Yearly vision board challenge',
            badges: ['Lifestyle', 'Personal Growth', 'Art'],
            imageSrc: 'https://www.founderjar.com/wp-content/uploads/2021/06/Online-Vision-Board-Apps-Makers-and-Websites1.jpg',
            status: 'Completed'
        },
        {
            id: '12',
            title: '30-day photography',
            badges: ['Creativity', 'Art'],
            imageSrc: "https://static.skillshare.com/uploads/video/thumbnails/0845ced88a932d74fbc99333cda0402d/original",
            status: 'In Progress'
        }
    ];

    return (
        <ChallengesContext.Provider value={{ featuredChallenges, trendingChallenges, myChallenges, userCreatedChallenges, setUserCreatedChallenges, allChallenges }}>
            {children}
        </ChallengesContext.Provider>
    );
};

// Custom Hook to use Challenges Context
export const useChallenges = () => {
    const context = useContext(ChallengesContext);
    if (!context) {
        throw new Error('useChallenges must be used within a ChallengesProvider');
    }
    return context;
};
