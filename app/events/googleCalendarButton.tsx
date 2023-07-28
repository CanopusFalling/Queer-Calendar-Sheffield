'use client';

import React from "react";
import { Event } from "./Event";
import moment from "moment-timezone";

export const runtime = 'edge';

interface GoogleCalendarButtonProps {
    event: Event;
}

const GoogleCalendarButton: React.FC<GoogleCalendarButtonProps> = ({ event }) => {
    const { summary, description, location, start, end } = event;

    const convertToUTC = (dateStr: string) => {
      const utcDate = moment.tz(dateStr, moment.tz.guess()).utc();
      return utcDate.format("YYYYMMDDTHHmmss[Z]");
    };
  
    const openGoogleCalendarTemplate = () => {
      let startDateTime = "";
      let endDateTime = "";
  
      if (start?.dateTime && end?.dateTime) {
        startDateTime = convertToUTC(start.dateTime);
        endDateTime = convertToUTC(end.dateTime);
      } else if (start?.date && end?.date) {
        startDateTime = convertToUTC(start.date + "T00:00:00");
        endDateTime = convertToUTC(end.date + "T00:00:00");
      } else {
        return;
      }
  
      const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        summary
      )}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(
        description
      )}&location=${encodeURIComponent(location)}`;
  
      window.open(url, "_blank");
    };

    return (
        <button className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            onClick={openGoogleCalendarTemplate}>
            Add to Google Calendar
        </button>
    );
}

export default GoogleCalendarButton;