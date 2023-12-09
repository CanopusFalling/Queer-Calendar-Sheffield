"use client";

import React from "react";
import moment from "moment";

import { EventData } from "../Event";
import { AddToCalendarButton } from "add-to-calendar-button-react";

interface AddEventToCalendarButtonProps {
  event: EventData;
}

const AddEventToCalendarButton: React.FC<AddEventToCalendarButtonProps> = ({
  event,
}) => {
  const eventLink = window.location.origin + event.path;
  return (
    <AddToCalendarButton
      //Event Details
      name={event.summary}
      description={`[url]${eventLink}|View this event on Queer Calendar Sheffield[/url]\n${event.description}`}
      startDate={moment(event.startTime).format("YYYY-MM-DD")}
      endDate={moment(event.endTime).format("YYYY-MM-DD")}
      startTime={moment(event.startTime).format("HH:mm")}
      endTime={moment(event.endTime).format("HH:mm")}
      timeZone={moment.tz.guess()}
      location={event.location}
      //Button Settings
      options={["Google", "Apple", "iCal", "Outlook.com", "Yahoo"]}
      buttonStyle="default"
      trigger="click"
      hideCheckmark={true}
      size="3"
      lightMode="system"
    />
  );
};

export default AddEventToCalendarButton;
