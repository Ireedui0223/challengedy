'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, MapPin, Image, Loader2 } from "lucide-react";
import { useState, } from 'react';
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toaster, toast } from "sonner";

export default function Page() {
    const router = useRouter();
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [locationEnabled, setLocationEnabled] = useState(false);
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<{
        title: string;
        description: string;
        type: string;
        badges: string[];
        imageSrc: string;
    }>({
        title: '',
        description: '',
        type: '',
        badges: [],
        imageSrc: ''
    });

    // Handle location toggle
    const handleLocationToggle = (enabled: boolean) => {
        setLocationEnabled(enabled);

        if (enabled && !latitude && !longitude) {
            requestLocation();
        }
    };

    // Function to request location
    const requestLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                    setLocationLoaded(true);
                    setLocationPermissionDenied(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLocationPermissionDenied(true);
                    setLocationEnabled(false);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
            setLocationEnabled(false);
        }
    };

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle type selection
    const handleTypeSelect = (value: string) => {
        setFormData(prev => ({
            ...prev,
            type: value
        }));
    };

    // Handle badge selection
    const handleBadgeClick = (badge: string) => {
        setFormData(prev => {
            const updatedBadges = prev.badges.includes(badge)
                ? prev.badges.filter(b => b !== badge)
                : [...prev.badges, badge];

            return {
                ...prev,
                badges: updatedBadges
            };
        });
    };

    // Handle image upload using ImageKit.io (free tier)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type", {
                description: "Please upload a JPEG, PNG, WebP or GIF image."
            });
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error("File too large", {
                description: "Please upload an image smaller than 2MB."
            });
            return;
        }

        setUploading(true);

        try {
            // Convert the file to base64
            const base64 = await convertToBase64(file);

            // Using the free Imgbb API (no authentication required for this endpoint)
            const response = await fetch('https://api.imgbb.com/1/upload?key=52ceb85397e35f3cb700c86645fe7871', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `image=${encodeURIComponent(base64.split(',')[1])}`
            });

            const data = await response.json();

            if (data.success) {
                setFormData(prev => ({
                    ...prev,
                    imageSrc: data.data.url
                }));
                toast.success("Image uploaded", {
                    description: "Your image has been successfully uploaded."
                });
            } else {
                throw new Error(data.error?.message || 'Failed to upload image');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error("Upload failed", {
                description: "Failed to upload image. Please try again."
            });
        } finally {
            setUploading(false);
        }
    };

    // Convert file to base64
    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Use a default image if none was uploaded
        const finalImageSrc = formData.imageSrc || 'https://placehold.co/400x200?text=Challenge+Image';

        const newChallenge = {
            id: Date.now().toString(),
            title: formData.title,
            description: formData.description,
            badges: formData.badges,
            type: formData.type,
            imageSrc: finalImageSrc,
            location: locationEnabled ? { latitude, longitude } : null
        };

        // Save to localStorage
        const existingChallenges = JSON.parse(localStorage.getItem('userCreatedChallenges') || '[]');
        localStorage.setItem('userCreatedChallenges', JSON.stringify([...existingChallenges, newChallenge]));

        toast.success("Challenge created", {
            description: "Your challenge has been successfully created."
        });

        // Navigate back to home
        router.push('/');
    };

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen pb-6">
            <div className="flex items-center p-4 border-b border-gray-200">
                <Button variant="ghost" className="mr-4 p-1 cursor-pointer" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <h1 className="text-lg font-medium">Create Custom Challenge</h1>
            </div>

            <form onSubmit={handleSubmit} className="px-4">
                <div className="mt-6">
                    <Label htmlFor="title">Challenge Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter challenge title"
                        className="mt-1"
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="description">Challenge Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter challenge details"
                        rows={3}
                        className="mt-1"
                        required
                    />
                </div>

                <div className="mt-4">
                    <Label htmlFor="type">Challenge Type</Label>
                    <Select
                        onValueChange={handleTypeSelect}
                        value={formData.type}
                        required
                    >
                        <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select challenge type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="photo">Photo Challenge</SelectItem>
                            <SelectItem value="video">Video Challenge</SelectItem>
                            <SelectItem value="text">Text Challenge</SelectItem>
                            <SelectItem value="daily">Daily Task</SelectItem>
                            <SelectItem value="weekly">Weekly Task</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-4">
                    <Label>Category Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {['Fitness', 'Health', 'Creativity', 'Art', 'Personal Growth', 'Lifestyle', 'Education'].map(badge => (
                            <Button
                                key={badge}
                                type="button"
                                variant={formData.badges.includes(badge) ? "default" : "outline" as "default" | "outline"}
                                size="sm"
                                onClick={() => handleBadgeClick(badge)}
                            >
                                {badge}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Image Upload Section */}
                <div className="mt-6">
                    <Label>Challenge Image</Label>
                    <Card className="mt-2">
                        <CardContent className="p-0">
                            {formData.imageSrc ? (
                                <div className="relative">
                                    <img
                                        src={formData.imageSrc}
                                        alt="Challenge"
                                        className="w-full h-40 object-cover"
                                    />
                                    <Button
                                        type="button"
                                        size="sm"
                                        variant="destructive"
                                        className="absolute top-2 right-2"
                                        onClick={() => setFormData(prev => ({ ...prev, imageSrc: '' }))}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ) : (
                                <label className="flex flex-col items-center justify-center h-40 bg-gray-100 cursor-pointer">
                                    {uploading ? (
                                        <div className="flex flex-col items-center">
                                            <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
                                            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <Image className="h-10 w-10 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-500">Upload an image</p>
                                            <p className="text-xs text-gray-400">JPG, PNG, WebP, GIF (max. 2MB)</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp,image/gif"
                                        className="hidden"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                    />
                                </label>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <MapPin size={18} />
                        <Label htmlFor="location">Enable Location</Label>
                    </div>
                    <Switch
                        id="location"
                        checked={locationEnabled}
                        onCheckedChange={handleLocationToggle}
                    />
                </div>

                {locationPermissionDenied && (
                    <p className="text-sm text-red-500 mt-1">
                        Location permission denied. Please enable location in your browser settings.
                    </p>
                )}

                {locationEnabled && (
                    <section className="mt-4">
                        <Card>
                            <CardContent className="p-0">
                                <div className="bg-gray-100 h-40">
                                    {locationLoaded ? (
                                        <iframe
                                            src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
                                            width="100%"
                                            height="100%"
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p>Loading map...</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                <Button className="w-full mt-8" type="submit" disabled={uploading}>
                    Create Challenge
                </Button>
            </form>

            {/* Add the Toaster component */}
            <Toaster />
        </div>
    );
}