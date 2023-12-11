"use client";

import React from "react";
import { useEffect } from "react";
import moment from "moment";

import { EventData } from "../Event";

interface AddEventToCalendarButtonProps {
  event: EventData;
}

import { atcb_action } from "add-to-calendar-button";
import { BsCalendarPlusFill } from "react-icons/bs";

const AddEventToCalendarButton: React.FC<AddEventToCalendarButtonProps> = ({
  event,
}) => {
  let eventLink;
  useEffect(() => {
    eventLink = window.location.origin + event.path;
  });
  const config: {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    location: string;
    iCalFileName: string;
    options: ("Google" | "Apple" | "iCal" | "Outlook.com" | "Yahoo")[];
    trigger: "click" | "hover" | undefined;
    hideCheckmark: boolean;
    size: string;
    lightMode: "system" | "dark" | "light" | "bodyScheme" | undefined;
  } = {
    name: event.summary,
    description: `[url]${eventLink}|View this event on Queer Calendar Sheffield[/url]\n${event.description}`,
    startDate: moment(event.startTime).format("YYYY-MM-DD"),
    endDate: moment(event.endTime).format("YYYY-MM-DD"),
    startTime: moment(event.startTime).format("HH:mm"),
    endTime: moment(event.endTime).format("HH:mm"),
    timeZone: moment.tz.guess(),
    location: event.location,
    iCalFileName: `Queer Calendar Sheffield - ${event.summary}`,
    options: ["Google", "Apple", "iCal", "Outlook.com", "Yahoo"],
    trigger: "click",
    hideCheckmark: true,
    size: "3",
    lightMode: "system",
  };

  const handleClick = () => {
    atcb_action(config);
  };

  return (
    <button
      data-testid={`share-button-${event.id}`}
      className="flex rounded items-center justify-center border border-black dark:border-white text-black dark:text-white px-4 py-2 text-xs font-medium uppercase"
      onClick={handleClick}
    >
      <BsCalendarPlusFill className="mr-2" />
      Add To Calendar
    </button>
  );
};

export default AddEventToCalendarButton;
