"use client";

import React from "react";
import { EventData } from "./Event";

import { BsShareFill } from "react-icons/bs";

interface GoogleCalendarButtonProps {
  event: EventData;
}

const ShareEventButton: React.FC<GoogleCalendarButtonProps> = ({ event }) => {
  const shareEvent = async () => {
    const url = `${window.location.origin}${event.path}`;
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
    <button
      data-testid={`share-button-${event.id}`}
      className="flex rounded items-center justify-center border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-medium uppercase"
      onClick={shareEvent}
    >
      <BsShareFill className="mr-2" />
      Share
    </button>
  );
};

export default ShareEventButton;
