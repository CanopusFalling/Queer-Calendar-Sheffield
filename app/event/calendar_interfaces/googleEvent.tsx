export enum googleEventStatus {
  "confirmed",
  "tentative",
  "cancelled",
}

export enum googleResponseStatus {
  "needsAction",
  "declined",
  "tentative",
  "accepted",
}

export enum googleConferenceKeyType {
  "eventHangout", // Depricated
  "eventNamedHangout", // Depricated
  "hangoutsMeet",
  "addOn",
}

export enum googleConferenceStatusCode {
  "pending",
  "success",
  "faliure",
}

export enum googleConferenceEntryPointType {
  "video",
  "phone",
  "sip",
  "more",
}

export enum googleEventReminderMethod {
  "email",
  "popup",
}

export enum googleCalendarEventType {
  "default",
  "outOfOffice",
  "focusTime",
  "workingLocation",
}

export interface googleCalendarUser {
  id: string;
  email: string;
  displayName: string;
  self: boolean; // Whether the creator corresponds to the calendar on which this copy of the event appears.
}

export interface googleEventTime {
  date: string; // Defined only when the event is 'all day' (formatted as 'yyyy-mm-dd')
  dateTime: string; // Date and time defined only when the event isn't 'all day' (formatted according to RFC3339)
  timeZone: string; // The time zone in which the time is specified. (Formatted as an IANA Time Zone Database name, e.g. "Europe/Zurich".)
}

// Interface based on this doccumentation: https://developers.google.com/calendar/api/v3/reference/events#resource
// RFC3339 Time Stamp Docs: https://datatracker.ietf.org/doc/html/rfc3339
export interface googleEventObject {
  kind: string; // Should always be 'calendar#event'
  etag: string;
  id: string;
  status?: googleEventStatus;
  htmlLink: string; // An absolute link to this event in the Google Calendar Web UI
  created: string; // Creation time of the event (as a RFC3339 timestamp)
  updated: string; // Last modification time of the event (as a RFC3339 timestamp)
  summary: string; // Event title
  description: string; // Description of the event. Can contain HTML
  location: string; // Geographic location of the event as free-form text
  colorId: string; // Reffer to this API info: https://developers.google.com/calendar/api/v3/reference/colors
  creator: googleCalendarUser;
  organiser: googleCalendarUser;
  start: googleEventTime;
  end: googleEventTime;
  endTimeUnspecified: boolean; // Whether the end time is actually unspecified. An end time is still provided for compatibility reasons, even if this attribute is set to True.
  recurrence: string[]; // List of RRULE, EXRULE, RDATE and EXDATE lines for a recurring event, as specified in RFC5545 (https://datatracker.ietf.org/doc/html/rfc5545#section-3.8.5). Note that DTSTART and DTEND lines are not allowed in this field; event start and end times are specified in the start and end fields.
  originalStartTime: googleEventTime;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number; // Integer
  attendees: {
    id: string;
    email: string;
    displayName?: string;
    organizer: boolean; // Is the attendee the event organiser
    self: boolean; // If this event is from this attendee's calendar
    resource?: boolean;
    optional?: boolean;
    responseStatus: googleResponseStatus;
    comment?: string; // Attendee's response comment
    additionalGuests?: number; // Integer
  }[];
  attendeesOmitted?: boolean; // Whether attendees may have been omitted from the event's representation
  extendedProperties: {
    // Google's catch all for other things they want to add to event objects
    private: {
      [key: string]: string;
    };
    shared: {
      [key: string]: string;
    };
  };
  hangoutLink: string; // An absolute link to the Google Hangout associated with this event
  conferenceData: {
    // The conference-related information, such as details of a Google Meet conference
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: googleConferenceKeyType;
      };
      status: {
        statusCode: googleConferenceStatusCode;
      };
    };
    entryPoints: {
      entryPointType: googleConferenceEntryPointType;
      uri: string;
      label: string;
      pin: string;
      accessCode: string;
      meetingCode: string;
      passcode: string;
      password: string;
    }[];
    conferenceSolution: {
      // Which conference type the event is.
      key: {
        type: googleConferenceKeyType;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
    signature: string;
    notes: string;
  };
  gadget: {
    // A gadget that extends this event. Gadgets are deprecated; this structure is instead only used for returning birthday calendar metadata.
    type: string;
    title: string;
    link: string;
    iconLink: string;
    width: number;
    height: number;
    display: string;
    preferences: {
      [key: string]: string;
    };
  };
  anyoneCanAddSelf?: boolean; // Deprecated
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: {
    useDefault: boolean;
    overrides: {
      method: googleEventReminderMethod;
      minutes: number;
    }[];
  };
  source: {
    url: string;
    title: string;
  };
  workingLocationProperties: {
    type: string;
    homeOffice: any; // Replace 'any' with the appropriate type of 'homeOffice'
    customLocation: {
      label: string;
    };
    officeLocation: {
      buildingId: string;
      floorId: string;
      floorSectionId: string;
      deskId: string;
      label: string;
    };
  };
  attachments?: {
    fileUrl: string;
    title: string;
    mimeType: string; // Internet media type (MIME type) of the attachment
    iconLink: string;
    fileId: string;
  }[];
  eventType: googleCalendarEventType;
}
