"use client";

import React from "react";

import { AddToCalendarButton } from "add-to-calendar-button-react";
import { EventData } from "./Event";

interface GoogleCalendarButtonProps {
  event: EventData;
}

const CalendarButton: React.FC<GoogleCalendarButtonProps> = ({ event }) => {
  const { summary, description, location, startTime, endTime } = event;
  return (
    <AddToCalendarButton
      name="Title"
      options={["Apple", "Google"]}
      location="World Wide Web"
      startDate="2023-12-12"
      endDate="2023-12-12"
      startTime="10:15"
      endTime="23:30"
      timeZone="America/Los_Angeles"
    />
  );
};

export default CalendarButton;
