import { googleEventObject } from "./calendar_interfaces/googleEvent";

import sanitizeHtml from "sanitize-html";

export interface EventData {
  id: string;
  iCalUID: string;
  summary: string;
  description?: string;
  location: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  lastModified: Date;
  path: string;
}

export class Event {
  id: string;
  iCalUID: string;
  summary: string;
  description?: string;
  location: string;
  startTime!: Date;
  endTime!: Date;
  allDay!: boolean;
  lastModified: Date;

  constructor(googleEventObject: googleEventObject);
  constructor(
    id: string,
    iCalUID: string,
    summary: string,
    description: string,
    location: string,
    start: Date,
    end: Date,
    allDay: boolean,
    lastModified: Date,
  );
  constructor(...args: any[]) {
    if ("id" in args[0]) {
      const {
        id,
        iCalUID,
        summary,
        description,
        location,
        start,
        end,
        updated,
      } = args[0] as googleEventObject;
      this.id = id;
      this.iCalUID = iCalUID;
      this.summary = summary;
      this.description = description;
      this.location = location;
      this.setTime(start, end);
      this.lastModified = new Date(updated);
    } else {
      this.id = args[0];
      this.iCalUID = args[1];
      this.summary = args[2];
      this.description = args[3];
      this.location = args[4];
      this.startTime = args[5];
      this.endTime = args[6];
      this.allDay = args[7];
      this.lastModified = args[8];
    }
  }

  setTime(
    start: { dateTime?: string; date?: string },
    end: { dateTime?: string; date?: string },
  ) {
    if (start.date !== undefined && end.date !== undefined) {
      this.allDay = true;
      this.startTime = new Date(start.date);
      this.endTime = new Date(end.date);
    } else if (start.dateTime !== undefined && end.dateTime !== undefined) {
      this.allDay = false;
      this.startTime = new Date(start.dateTime);
      this.endTime = new Date(end.dateTime);
    } else {
      throw new Error(
        `Google event time in unexpected format, expected either 'date' or 'dateTime' to be set for both 'start' and 'end': ${start} ${end}`,
      );
    }
  }

  toPlainObject(): EventData {
    return {
      id: this.id,
      iCalUID: this.iCalUID,
      summary: this.summary,
      description: this.description,
      location: this.location,
      startTime: this.startTime,
      endTime: this.endTime,
      allDay: this.allDay,
      lastModified: this.lastModified,
      path: this.getPath(),
    };
  }

  getMarkupDescription() {
    const sanitizeOptions = {
      allowedTags: ["b", "i", "em", "strong", "a", "p"],
      allowedAttributes: {
        a: ["href"],
      },
    };

    return sanitizeHtml(this.description || "", sanitizeOptions);
  }

  getURIEncodedName() {
    let name = this.summary.replaceAll(" ", "_");
    return encodeURIComponent(name);
  }

  getPath() {
    return `/event/${this.id}/${this.getURIEncodedName()}`;
  }
}
