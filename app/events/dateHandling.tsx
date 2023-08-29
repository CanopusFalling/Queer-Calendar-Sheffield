"use client";

import { useEffect, useState, ReactElement, createElement } from "react";
import moment from "moment-timezone";

export const runtime = "edge";

interface DateTimeWithDSTProps {
    start: Date;
    end: Date;
    isFullDayEvent: Boolean;
}

const DateTimeWithDST: React.FC<DateTimeWithDSTProps> = ({ start, end, isFullDayEvent }) => {
    const [formattedDateTime, setFormattedDateTime] = useState<ReactElement>();

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

        if (!isSameDay) {
            if (!isFullDayEvent) {
                formattedEnd = endDate.tz(timezone).format("Do MMMM YYYY HH:mm");
            }
        }

        //Wrap the formatted strings in time elements to improve accessibility
        let formattedStartElement = createElement(
            "time",
            {
                datetime: startDate.tz(timezone).format("YYYY-MM-DDTHH:mm:ss.sssZ"),
            },
            formattedStart
        );
        let formattedEndElement = createElement(
            "time",
            {
                datetime: endDate.tz(timezone).format("YYYY-MM-DDTHH:mm:ss.sssZ"),
            },
            formattedEnd
        );

        if (isSameDay && isFullDayEvent) {
            setFormattedDateTime(formattedStartElement);
        } else {
            setFormattedDateTime(
                createElement("span", {}, formattedStartElement, " to ", formattedEndElement)
            );
        }
    }, [start, end, isFullDayEvent]);

    return formattedDateTime;
};

export default DateTimeWithDST;
