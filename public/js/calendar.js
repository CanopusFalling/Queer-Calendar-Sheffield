const GOOGLE_CALENDAR_API_KEY = "AIzaSyCG_DrTXfD1Zrt2rCXsgc5-W0reHuPG49E"

/**
 * @enum {string}
 * @description ENUM to identify calendar source types.
 */
const CalendarSourceType = {
    GOOGLE_CALENDAR: 'google_calendar'
};

/**
 * @class CalendarSource
 * @classdesc Represents an online calendar that can be used to pull events from.
 * @constructor
 * @param {string} name - The name of the calendar source.
 * @param {CalendarSourceType} type - The type of the calendar source.
 * @param {string} googleCalendarId - The ID of the Google Calendar associated with this calendar source.
 */
class CalendarSource {
    constructor(name, type, googleCalendarId) {
        this.name = name;
        this.type = type;
        this.googleCalendarId = googleCalendarId;
    }

    fetchEvents(timeMin, timeMax) {
        if (this.type == CalendarSourceType.GOOGLE_CALENDAR) {
            return this.#fetchGoogleCalendarData(timeMin, timeMax)
        }
    }

    /**
     * Function to request information from the google calendar event's API, reference for the API here:
     * https://developers.google.com/calendar/api/v3/reference/events/list
     * @param {*} timeMin
     * @param {*} timeMax 
     * @param {*} showDeleted 
     */
    #fetchGoogleCalendarData(timeMin, timeMax, showDeleted) {
        let parameters = {
            key: GOOGLE_CALENDAR_API_KEY,
            timeMin: timeMin.toISOString() || new Date().toISOString(), //Sets timeMin to current date if one isn't specified.
            timeMax: timeMax.toISOString(),
            showDeleted: showDeleted,
            singleEvents: true
        };

        let queryString = new URLSearchParams(
            Object.entries(parameters)
                .filter(([key, value]) => value !== undefined)
        ).toString();
        let requestURL = `https://www.googleapis.com/calendar/v3/calendars/${this.googleCalendarId}/events?${queryString}`

        let events = []

        return fetch(requestURL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let events = data.items.map(event => new CalendarEvent(event, this));
                return events;
            })
            .catch(error => {
                console.log(error);
                return [];
            });

        return events
    }
}

/**
 * @class CalendarEvent
 * @classdesc Class to represent an event on the calendar.
 */
class CalendarEvent {
    /**
     * @constructor
     * @param {Object} data - Raw data about this event from the event source.
     * @param {CalendarSource} source - Source for the event.
     */
    constructor(data, source) {
        this.source = source

        if (source.type == CalendarSourceType.GOOGLE_CALENDAR) {
            this.#google_constructior(data)
        }
    }

    /**
     * A function to handle the construction of google calendar objects.
     * @param {Object} data
     */
    #google_constructior(data) {
        console.log(data)

        // Basic Event Information.
        this.title = data.summary;
        this.creator = this.creator;
        this.description = data.description;
        this.location = data.location
        
        // Calendar ID Information.
        this.iCalUID = data.iCalUID;
        this.googleID = data.id

        this.dateCreated = data.created;

        this.#google_ingest_time(data)
        this.calendar_link = data.htmlLink

        this.last_updated = data.updated
    }

    /**
     * A function to handle ingesting time from google events.
     * @param {Object} data 
     */
    #google_ingest_time(data) {
        if (data.start != undefined) {
            if (data.start.dateTime != undefined) { this.start = new Date(data.start.dateTime) }
            else if (data.start.date != undefined) { this.start = new Date(data.start.date) }
        }

        if (data.end != undefined) {
            if (data.end.dateTime != undefined) { this.end = new Date(data.end.dateTime) }
            else if (data.end.date != undefined) { this.end = new Date(data.end.date) }
            else this.end = undefined
        }
    }

    /**
     * Formats a date into a string
     * @param {Object} date 
     * @returns {String} in the following format "DD [MonthName] YYYY at HH:MM [am/pm]"
     */
    formatDate(date) {
        return date.toLocaleString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    /**
     * Formats a date into a string with just the time.
     * @param {Object} date 
     * @returns {String} in the following format "HH:MM [am/pm]"
     */
    formatTime(date) {
        return date.toLocaleString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

    /**
     * Function to get the time as a String for the event.
     * @returns {String} Time in human readable format.
     */
    getTimeString() {
        if (this.end == undefined) {
            return this.formatDate(this.start)
        } else {
            if (this.end.getDay() == this.start.getDay()) {
                return this.formatDate(this.start) + " - " + this.formatTime(this.end)
            } else {
                return this.formatDate(this.start) + " - " + this.formatDate(this.end)
            }
        }
    }

    /**
     * Function to return the event as an easily human readable string.
     * @returns {String} Event title, location and time.
     */
    toString() {
        return `${this.title} | ${this.location} | ${this.getTimeString()}`
    }

    /**
     * Output the event as a Card Element.
     * @returns {String} HTML event card element.
     */
    toEventCard() {
        return `
        <div class="col">
            <div class="bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="px-4 py-3 bg-gray-200">
                <h4 class="text-xl font-semibold">${this.title}</h4>
            </div>
            <div class="px-4 py-3">
                <p class="mb-2">
                <span class="font-semibold">Location:</span> ${this.location}
                </p>
                <p class="mb-2">
                <span class="font-semibold">Time:</span> ${this.getTimeString()}
                </p>
                <p class="mb-2 truncate">${this.description}</p>
                <button type="button" class="px-4 py-2 mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                data-toggle="modal" data-target="#eventModal-${this.id}">More Information</button>
            </div>
            </div>
        </div>
        `
    }

    /**
     * Output the event as a Modal Element.
     * @returns {String} HTML Modal Element
     */
    toModal() {
        return `
        <div class="fixed inset-0 flex items-center justify-center z-50" id="eventModal-${this.id}" aria-labelledby="eventModalLabel-${this.id}" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h2 class="modal-title">${this.title}</h2>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><span class="font-semibold">Location:</span> ${this.location}</p>
                    <p><span class="font-semibold">Time:</span> ${this.getTimeString()}</p>
                    <p>${this.description}</p>
                </div>
                </div>
            </div>
        </div>
        `
    }
}

/**
 * @class Calendar
 * @classdesc A class to store, organise and output all of the CalendarEvents.
 */
class Calendar {
    constructor(calendarSources) {
        this.calendarSources = calendarSources;

        this.minDate = new Date();
        this.maxDate = new Date();

        this.events = new Array();
    }

    fetchAllEvents(timeMin, timeMax) {
        timeMin = timeMin || new Date()
        timeMax = timeMax || new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) //Sets date to a year from now if one isn't provided.

        let fetchPromises = this.calendarSources.map(async (source) => {
            let events = await source.fetchEvents(timeMin, timeMax);
            this.events.push(...events);
        });

        return Promise.all(fetchPromises);
    }

    /**
     * Checks if an event is already in the calendar.
     * The check might have to compare from different sources with competing info.
     * @param {CalendarEvent} new_event 
     * @returns {Boolean}
     */
    hasEvent(new_event) {
        this.events.forEach(event => {
            if (event.name == new_event.name && event.start == new_event.start) {
                return true
            }
        })
        return false
    }

    /**
     * Sorts all the events in the calendar by start date.
     */
    sortEvents() {
        this.events.sort(function (a, b) {
            return a.start - b.start;
        });
    }

    /**
     * Outputs all the calendar events into the DOM.
     */
    outputInfo() {
        this.sortEvents();

        let event_container = document.getElementById(EVENT_CARD_CONTAINER_ID)
        let modal_container = document.getElementById(EVENT_MODAL_CONTAINER_ID)

        let event_cards = ""
        let modal_cards = ""

        this.events.forEach(event => {
            event_cards += event.toEventCard()
            modal_cards += event.toModal()
        })

        event_container.innerHTML = event_cards
        modal_container.innerHTML = modal_cards
    }
}

// Script Settings
// Sets default values for the settings of this script if they've not already been set

const EVENT_CARD_CONTAINER_ID = "event-card-container";
const EVENT_MODAL_CONTAINER_ID = "event-modal-container";

const SOURCES = [new CalendarSource("Queer Calendar Sheffield Google Calendar", CalendarSourceType.GOOGLE_CALENDAR, "queercalendarsheffield@gmail.com")];

// Removed source, not enough info on the PQA calendar currently. Looking to add it back in if it's updated.
// new CalendarSource("Peak Queer Adventures Google Calendar", SourceType.GOOGLE_CALENDAR, "peakqueeradventures@gmail.com")

var loaded_sources = 0;

// Instantiate a global calendar for the page that will be used to store info.
var page_calendar = new Calendar(SOURCES);

document.addEventListener("DOMContentLoaded", function () {
    page_calendar.fetchAllEvents()
    .then(() => {
        page_calendar.outputInfo()
    })
})