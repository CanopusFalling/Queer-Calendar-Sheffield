'use client';

import React from "react";
import { EventData } from "./Event";

import { BsShareFill } from "react-icons/bs";

export const runtime = 'edge';

interface GoogleCalendarButtonProps {
    event: EventData;
}

const GoogleCalendarButton: React.FC<GoogleCalendarButtonProps> = ({ event }) => {

    const shareEvent = async () => {
        const url = `${window.location.origin}/events?eventId=${event.id}`;
        try {
            // Check if the Web Share API is available (mobile devices)
            if (navigator.share) {
                await navigator.share({
                    title: event.summary,
                    url: url,
                });
            } else {
                // Fallback for desktop devices
                await navigator.clipboard.writeText(url);
                alert("Event link copied to clipboard!");
            }
        } catch (error) {
            console.error("Error sharing event:", error);
        }
    };

    return (
        <button className="flex rounded items-center justify-center border border-black dark:border-white text-black dark:text-white px-4 py-2"
            onClick={shareEvent}>
            <BsShareFill className="mr-2" />
            share!
        </button>
    );
}

export default GoogleCalendarButton;