'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from '@/components/Layout';
import FeaturedChallenges from '@/components/ChallengeCarousel';
import { AvatarImage } from '@/components/ui/avatar';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import MyChallenges from '@/components/MyChallenges';
import { useChallenges } from './context/ChallengeContext';

export default function Home() {
    const router = useRouter();
    const { featuredChallenges, trendingChallenges, myChallenges, userCreatedChallenges } = useChallenges();


    // Here we would typically fetch user's created challenges from an API or local storage
    const [, setUserCreatedChallenges] = React.useState([]);

    React.useEffect(() => {
        // Check if there are any saved challenges in localStorage
        const savedChallenges = localStorage.getItem('userCreatedChallenges');
        if (savedChallenges) {
            setUserCreatedChallenges(JSON.parse(savedChallenges));
        }
    }, []);

    return (
        <Layout>
            <Head>
                <title>Challenge App</title>
                <meta name="description" content="Take on and create challenges" />
            </Head>

            <div className="px-4 pb-24">
                {/* Featured Challenges */}
                <section className="mt-6" id='featured'>
                    <h2 className="text-lg font-bold mb-3">Featured Challenges</h2>
                    <FeaturedChallenges challenges={featuredChallenges} />
                </section>

                {/* Trending Challenges */}
                <section className="mt-6" >
                    <h2 className="text-lg font-bold mb-1">Trending Challenges</h2>
                    <FeaturedChallenges challenges={trendingChallenges} />
                </section>

                {/* User Created Challenges */}
                {userCreatedChallenges.length > 0 && (
                    <section className="mt-6">
                        <h2 className="text-lg font-bold mb-3">Your Created Challenges</h2>
                        <FeaturedChallenges challenges={userCreatedChallenges} />
                    </section>
                )}

                {/* Create Custom Challenge Button */}
                <Button
                    className="w-full mt-4"
                    onClick={() => router.push('/challenge/create')}
                >
                    Create Custom Challenge
                </Button>

                {/* User Reviews */}
                <section className="mt-6">
                    <h2 className="text-lg font-bold mb-3">User Reviews</h2>
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                        <Card className="min-w-48 border border-gray-200">
                            <CardContent className="px-3 py-1">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                                        <Avatar className="mr-3">
                                            <AvatarImage
                                                src="https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                                alt="User"
                                                sizes="100%"
                                                className="object-fill"
                                            /><AvatarFallback>OP</AvatarFallback>
                                        </Avatar>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">WellnessKate</p>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-xs">★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs mt-2 text-gray-700">I love the daily kindness challenges</p>
                            </CardContent>
                        </Card>

                        <Card className="min-w-48 border border-gray-200">
                            <CardContent className="px-3 py-1">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                                        <Avatar className="mr-3">
                                            <AvatarImage
                                                src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
                                                alt="User"
                                                sizes="100%"
                                                className="object-fill"
                                            /><AvatarFallback>OP</AvatarFallback>
                                        </Avatar>
                                    </div> <div>
                                        <p className="text-sm font-medium">MindfulMark</p>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-xs">★</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs mt-2 text-gray-700">The 30-day photo was wonderful. I enjoyed every bit </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Your Challenges */}
                <section className="mt-6">
                    <h2 className="text-lg font-bold mb-3">Your Challenges</h2>
                    <MyChallenges challenges={myChallenges} />
                </section>

                {/* Challenge Details */}
                <section className="mt-6">
                    <h2 className="text-lg font-bold mb-3">Challenge Details</h2>
                    <Card>
                        <CardContent className="p-3">
                            <h3 className="font-medium">30-days creative writing</h3>
                            <p className="text-xs text-gray-600 mt-1">Express your thoughts and imagination through writing a little every day. Let your creativity flow!</p>
                            <div className="mt-2 flex items-center">
                                <div className="w-6 h-6 bg-gray-200 rounded-full mr-2"></div>
                                <span className="text-xs">CreativeSoul</span>
                            </div>
                        </CardContent>
                    </Card>
                </section>

                {/* Challenge Stats */}
                <section className="mt-6">
                    <h2 className="text-lg font-bold mb-3">Challenge Stats</h2>
                    <Card>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-gray-500">Total Challenges</p>
                                    <p className="font-bold text-2xl">135</p>
                                    <p className="text-xs text-green-600">+10%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Active Users</p>
                                    <p className="font-bold text-2xl">3278</p>
                                    <p className="text-xs text-green-600">+25%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </section>
            </div>
        </Layout>
    );
}