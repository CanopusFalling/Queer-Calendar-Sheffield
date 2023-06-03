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

    addEventsToCalendar(timeMin, timeMax) {
        if (this.type == CalendarSourceType.GOOGLE_CALENDAR){this.#fetchGoogleCalendarData(timeMin, timeMax)}
    }

    /**
     * Function to request information from the google calendar event's API, reference for the API here:
     * https://developers.google.com/calendar/api/v3/reference/events/list
     * @param {*} timeMin
     * @param {*} timeMax 
     * @param {*} showDeleted 
     */
    #fetchGoogleCalendarData(timeMin, timeMax, showDeleted){
        let parameters = {
            key: GOOGLE_CALENDAR_API_KEY,
            timeMin: timeMin || new Date().toISOString(),
            timeMax: timeMax || undefined
        };
        
        let queryString = new URLSearchParams(
            Object.entries(parameters)
              .filter(([key, value]) => value !== undefined)
          ).toString();
        let requestURL = `https://www.googleapis.com/calendar/v3/calendars/${this.googleCalendarId}/events?${queryString}`

        console.log(requestURL)

        fetch(requestURL)
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => {
                console.log(error)
            })
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
     * @param {CalendarSourceType} source - Which source the data is from.
     */
    constructor(data, source) {
        if (source == CalendarSourceType.GOOGLE_CALENDAR) {
            this.#google_constructior(data)
        }
    }

    /**
     * A function to handle the construction of google calendar objects.
     * @param {Object} data
     */
    #google_constructior(data) {
        this.id = data.id
        this.title = data.summary
        this.description = data.description
        this.location = data.location
        this.#google_ingest_time(data)
        this.calendar_link = data.htmlLink
        this.iCal_UID = data.iCalUID
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
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">${this.title}</h4>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        <span class="fw-bold">Location:</span> ${this.location}
                    </p>
                    <p class="card-text">
                        <span class="fw-bold">Time:</span> ${this.getTimeString()}
                    </p>
                    <p class="card-text text-truncate">${this.description}</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#eventModal-${this.id}">More Information</button>
                </div>
            </div>
        </div>`
    }

    /**
     * Output the event as a Modal Element.
     * @returns {String} HTML Modal Element
     */
    toModal() {
        return `
        <div class="modal fade" id="eventModal-${this.id}" tabindex="-1" aria-labelledby="eventModalLabel-${this.id}"
            aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="eventModalLabel-${this.id}">${this.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p><span class="fw-bold">Location:</span> ${this.location}</p>
                        <p><span class="fw-bold">Time:</span> ${this.getTimeString()}</p>
                        <p>${this.description}</p>
                    </div>
                </div>
            </div>
        </div>`
    }
}

/**
 * @class Calendar
 * @classdesc A class to store, organise and output all of the CalendarEvents.
 */
class Calendar {
    constructor() {
        this.events = []
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
     * Inputs a list of events into the calendar.
     * @param {Object} events 
     */
    inputEvents(events) {
        events.forEach(event => {
            if (!this.hasEvent(event)) {
                this.events.push(event)
            }
        });
    }

    /**
     * Sorts all the events in the calendar by start date.
     */
    sortEvents() {
        this.events.sort(function(a, b) {
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
var page_calendar = new Calendar();

function handleGoogleCalendarData(data) {
    let events = []
    console.log(data)
    data.items.forEach(event => {
        events.push(new CalendarEvent(event, CalendarSourceType.GOOGLE_CALENDAR))
    });

    page_calendar.inputEvents(events)

    loaded_sources += 1;
    if (loaded_sources == SOURCES.length) {
        page_calendar.outputInfo()
    }
}

function fetchCalendarData(calendar, callback, timeMin, timeMax) {
    console.log(calendar)
    // Set Default Values for Dates as they're optional parameters.
    if (timeMin == undefined) { timeMin = "&timeMin=" + (new Date()).toISOString() } else { timeMin = "&timeMin=" + timeMin }
    if (timeMax == undefined) { timeMax = "" } else { timeMax = "&timeMax=" + timeMax }

    var requestUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar.googleCalendarId}/events?callback=${callback}&key=${GOOGLE_CALENDAR_API_KEY}&showDeleted=False&singleEvents=True&orderBy=starttime${timeMin}${timeMax}`;

    var script = document.createElement('script');
    script.src = requestUrl;
    document.body.appendChild(script);
}

function loadSources(timeMin, timeMax) {
    SOURCES.forEach(source => {
        //fetchCalendarData(source, "CalendarSource.handleGoogleCalendarData", timeMin, timeMax);
        source.addEventsToCalendar(timeMin, timeMax);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var currentUrl = window.location.href;
    var url = new URL(currentUrl);
    var searchParams = url.searchParams;

    loadSources(searchParams.timeMin, searchParams.timeMax)
})