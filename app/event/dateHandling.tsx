"use client";

import { useEffect, useState } from "react";
import moment from "moment-timezone";

interface DateTimeWithDSTProps {
  start: Date;
  end: Date;
  isFullDayEvent: Boolean;
}

const DateTimeWithDST: React.FC<DateTimeWithDSTProps> = ({
  start,
  end,
  isFullDayEvent,
}) => {
  const [formattedDateTime, setFormattedDateTime] = useState<string>("");

  useEffect(() => {
    // Create moment objects with the provided dates for start and end
    const startDate = moment(start);
    const endDate = moment(end);

    // Get the timezone identifier of the user's locale (e.g., "America/New_York")
    const timezone = moment.tz.guess();

    // Check if the start and end dates are on the same day
    const isSameDay = startDate.isSame(endDate, "day");

    // Format the start and end date and time for display, accounting for DST
    let formattedStart = startDate.tz(timezone).format("Do MMMM YYYY HH:mm");
    let formattedEnd = endDate.tz(timezone).format("HH:mm");

    if (isFullDayEvent) {
      formattedStart = startDate.tz(timezone).format("Do MMMM YYYY");
      formattedEnd = endDate.tz(timezone).format("Do MMMM YYYY");
    }

    if (!isSameDay && !isFullDayEvent) {
      formattedEnd = endDate.tz(timezone).format("Do MMMM YYYY HH:mm");
    }

    if (isSameDay && isFullDayEvent) {
      setFormattedDateTime(formattedStart);
    } else {
      setFormattedDateTime(`${formattedStart} - ${formattedEnd}`);
    }
  }, [start, end]);

  return formattedDateTime;
};

export default DateTimeWithDST;
