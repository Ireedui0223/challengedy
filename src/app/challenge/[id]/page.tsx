'use client'
import React, { useState } from 'react';
import { ChevronLeft, Star, Gift, Trophy, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useParams } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from 'next/image';
import { useChallenges } from '@/app/context/ChallengeContext';
import { Badge } from '@/components/ui/badge';

export default function ChallengeDetailPage() {
    const router = useRouter();
    const { id } = useParams();
    const { allChallenges, myChallenges } = useChallenges();
    const [showCongratulationDialog, setShowCongratulationDialog] = useState(false);
    const challenge = allChallenges.find(challenge => challenge.id === id);
    if (!challenge) {
        return null;
    }
    const { badges, imageSrc, title, } = challenge;

    const handleAcceptChallenge = () => {
        setShowCongratulationDialog(true);
    };

    const handleDialogClose = () => {
        setShowCongratulationDialog(false);
        myChallenges.push(challenge);
        router.push('/'); // Navigate back to home page
    };

    return (
        <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
            {/* Header with back button */}
            <div className="flex items-center p-4 bg-white">
                <button onClick={() => router.back()} className="mr-4">
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <h1 className="text-lg font-medium">Challenge Details</h1>
            </div>

            {/* Opponent Player */}
            <div className="p-4 bg-white flex items-center">
                <Avatar className="mr-1 h-10 w-10">
                    <AvatarImage
                        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/32a508cf-362e-4d59-adb0-e3d0dbe264a1/dgve4ta-09c9e34a-827c-4eb1-b29b-9dcfea30c150.png/v1/fill/w_1920,h_1920,q_80,strp/couple_profile_picture__brunette_girl_in_love_by_samnooneson_dgve4ta-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzMyYTUwOGNmLTM2MmUtNGQ1OS1hZGIwLWUzZDBkYmUyNjRhMVwvZGd2ZTR0YS0wOWM5ZTM0YS04MjdjLTRlYjEtYjI5Yi05ZGNmZWEzMGMxNTAucG5nIiwiaGVpZ2h0IjoiPD0xOTIwIiwid2lkdGgiOiI8PTE5MjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMzJhNTA4Y2YtMzYyZS00ZDU5LWFkYjAtZTNkMGRiZTI2NGExXC9zYW1ub29uZXNvbi00LnBuZyIsIm9wYWNpdHkiOjk1LCJwcm9wb3J0aW9ucyI6MC40NSwiZ3Jhdml0eSI6ImNlbnRlciJ9fQ.BvWfGNRYWH20fXm6hxMIAf8hUUzZZiopYZ1rbSo8EOc"
                        alt="User"
                        sizes="100%"
                        className="object-fill"
                    /><AvatarFallback>OP</AvatarFallback>
                </Avatar>
                <div className="ml-3">
                    <p className="font-medium">Opponent Player</p>
                    <p className="text-sm text-gray-500">Level 15</p>
                </div>
            </div>

            {/* Game Details */}
            <div className="mt-2 p-4 bg-white">
                <Card className="mt-2 py-0 overflow-hidden border">
                    <CardContent className="p-0">
                        <div className="h-40 relative">
                            <Image
                                src={imageSrc}
                                alt={title}
                                fill
                                sizes="100%"
                                className="object-fill"
                            />
                        </div>
                        <div className="p-3">
                            <div>
                                <h2 className="font-medium">{title}</h2>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {badges.map((badge, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">{badge}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="flex mt-1 space-x-2  items-center">
                                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                <Gift className="h-5 w-5 text-orange-500 fill-orange-500" />
                                <Button variant="outline" size="sm" className="text-sm rounded-md">
                                    Play Now
                                </Button>
                            </div>

                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Player Reviews */}
            <div className="mt-2 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-medium">Player Reviews</h2>
                        <p className="text-sm text-gray-500">Game Experience</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-sm rounded-md">
                        View All Reviews
                    </Button>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-2 gap-3 mt-2">
                    {/* Review 1 */}
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center">
                            <Avatar className="h-6 w-6 bg-gray-300">
                                <span className="sr-only">Player123</span>
                            </Avatar>
                            <p className="ml-2 text-sm">Player123</p>
                            <div className="ml-auto flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                                ))}
                            </div>
                        </div>
                        <p className="text-sm mt-2">Amazing gameplay and graphics!</p>
                        <div className="flex space-x-2 mt-2">
                            <button className="p-1 bg-gray-200 rounded">
                                <span className="text-sm">👍</span>
                            </button>
                            <button className="p-1 bg-gray-200 rounded">
                                <span className="text-sm">👎</span>
                            </button>
                        </div>
                    </div>

                    {/* Review 2 */}
                    <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex items-center">
                            <Avatar className="h-6 w-6 bg-gray-300">
                                <span className="sr-only">Gamer456</span>
                            </Avatar>
                            <p className="ml-2 text-sm">Gamer456</p>
                        </div>
                        <p className="text-sm mt-2">Challenging and addictive!</p>
                        <div className="flex space-x-2 mt-2">
                            <button className="p-1 bg-gray-200 rounded">
                                <span className="text-sm">👍</span>
                            </button>
                            <button className="p-1 bg-gray-200 rounded">
                                <span className="text-sm">👎</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Challenge Instructions */}
            <div className="mt-2 p-4 bg-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="font-medium">Challenge Instructions</h2>
                        <p className="text-sm text-gray-500">Winning Strategy</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-sm rounded-md">
                        Read More
                    </Button>
                </div>

                {/* Gameplay Tips */}
                <div className="mt-2 bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                        <p className="font-medium">Gameplay Tips</p>
                    </div>
                    <p className="text-sm text-gray-500 text-center">Level Up Faster</p>
                    <p className="text-sm mt-2 text-center">
                        Master the advanced moves to outplay your opponent
                    </p>
                    <div className="mt-3 flex items-center">
                        <Avatar className="h-6 w-6 bg-gray-300">
                            <span className="sr-only">GameMaster</span>
                        </Avatar>
                        <p className="ml-2 text-sm">GameMaster</p>
                        <div className="ml-auto flex items-center">
                            <Trophy className="h-5 w-5 text-yellow-500" />
                            <MessageCircle className="h-5 w-5 text-yellow-200 ml-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-auto p-4 space-y-2">
                <Button variant="outline" className="w-full bg-white">
                    Reject
                </Button>
                <Button variant="outline" className="w-full bg-white">
                    Ask for Rematch
                </Button>
                <Button
                    className="w-full bg-black text-white hover:bg-gray-800"
                    onClick={handleAcceptChallenge}
                >
                    Accept Challenge
                </Button>
            </div>

            {/* Congratulation Dialog */}
            <Dialog open={showCongratulationDialog} onOpenChange={setShowCongratulationDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <div className="flex justify-center mb-4">
                            <CheckCircle2 className="h-16 w-16 text-green-500" />
                        </div>
                        <DialogTitle className="text-center text-xl">Congratulations!</DialogTitle>
                        <DialogDescription className="text-center">
                            You have successfully accepted the challenge. Get ready to play and win!
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center items-center py-4">
                        <Trophy className="h-10 w-10 text-yellow-500 mr-2" />
                        <div>
                            <p className="font-medium">Level 20 Challenge</p>
                            <p className="text-sm text-gray-500">Opponent: Level 15 Player</p>
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-center">
                        <Button
                            className="bg-black text-white hover:bg-gray-800"
                            onClick={handleDialogClose}
                        >Let&apos;s Go!</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}