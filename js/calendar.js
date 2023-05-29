const GOOGLE_CALENDAR_API_KEY = "AIzaSyCG_DrTXfD1Zrt2rCXsgc5-W0reHuPG49E"

// Love not having ENUMS in JS. /s :(
const SourceType = {
    google_calendar: 'google_calendar'
}

class EventSource {
    constructor(name, type, google_calendar_ID) {
        this.name = name
        this.type = type
        this.google_calendar_ID = google_calendar_ID
    }
}

const QCS_CALENDAR_ID = "queercalendarsheffield@gmail.com"; 
const SOURCES = [
    new EventSource("Queer Calendar Sheffield Google Calendar", SourceType.google_calendar, "queercalendarsheffield@gmail.com"),
    new EventSource("Peak Queer Adventures Google Calendar", SourceType.google_calendar, "peakqueeradventures@gmail.com")];

class Event {
    constructor(data, format) {
        if (format == SourceType.google_calendar) {
            this.#google_constructior(data)
        }
    }

    #google_constructior(data) {
        this.title = data.summary
        this.description = data.description
        this.location = data.location
        this.#google_ingest_time(data)
        this.calendar_link = data.htmlLink
        this.iCal_UID = data.iCalUID
        this.last_updated = data.updated
    }

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

    formatTime(date) {
        return date.toLocaleString(undefined, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }

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

    toString() {
        return `${this.title} | ${this.location} | ${this.getTimeString()}`
    }
}

class Calendar {
    constructor() {
        this.events = []
    }

    hasEvent(new_event){
        this.events.forEach(event => {
            if(event.name == new_event.name && event.start == new_event.start){
                return true
            }
        })
        return false
    }

    inputEvents(events){
        events.forEach(event => {
            if(!this.hasEvent(event)){
                this.events.push(event)
            }
        });
    }

    outputInfo(){
        //Placeholder, will output all the events to the DOM.
        document.body.innerHTML = this.events
    }
}

var loaded_sources = 0;

var page_calendar = new Calendar();

function handleGoogleCalendarData(data) {
    let events = []
    data.items.forEach(event => {
        events.push(new Event(event, SourceType.google_calendar))
    });

    page_calendar.inputEvents(events)

    loaded_sources += 1;
    if(loaded_sources == SOURCES.length){
        page_calendar.outputInfo()
    }
}

function fetchCalendarData(calendar, callback, timeMin, timeMax) {
    // Set Default Values for Dates as they're optional parameters.
    if (timeMin == undefined) { timeMin = "&timeMin=" + (new Date()).toISOString() } else { timeMin = "&timeMin=" + timeMin }
    if (timeMax == undefined) { timeMax = "" } else { timeMax = "&timeMax=" + timeMax }

    var requestUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar.google_calendar_ID}/events?callback=${callback}&key=${GOOGLE_CALENDAR_API_KEY}&showDeleted=False&singleEvents=True&orderBy=starttime${timeMin}${timeMax}`;

    var script = document.createElement('script');
    script.src = requestUrl;
    document.body.appendChild(script);
}

function loadSources(timeMin, timeMax){
    SOURCES.forEach(source => {
        fetchCalendarData(source, "handleGoogleCalendarData", timeMin, timeMax); 
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var currentUrl = window.location.href;
    var url = new URL(currentUrl);
    var searchParams = url.searchParams;

    loadSources(searchParams.timeMin, searchParams.timeMax)
})