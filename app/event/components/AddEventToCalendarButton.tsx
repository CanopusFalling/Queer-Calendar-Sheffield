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
  return (
    <AddToCalendarButton
      name={event.summary}
      description={event.description}
      options={["Apple", "Google"]}
      startDate={moment(event.startTime).format("YYYY-MM-DD")}
      endDate={moment(event.endTime).format("YYYY-MM-DD")}
      startTime={moment(event.startTime).format("HH:mm")}
      endTime={moment(event.endTime).format("HH:mm")}
    />
  );
};

export default AddEventToCalendarButton;
