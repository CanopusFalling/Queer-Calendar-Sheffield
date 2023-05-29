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

const QCS_CALENDAR_SOURCE = new EventSource("Queer Calendar Sheffield Google Calendar", SourceType.google_calendar, "queercalendarsheffield@gmail.com")
const COMMUNITY_SOURCES = [new EventSource("Peak Queer Adventures Google Calendar", SourceType.google_calendar, "peakqueeradventures@gmail.com")]

class Event {
    constructor(data, format) {
        if (format == SourceType.google_calendar) {
            this.#google_constructior(data)
        }
    }

    #google_constructior(data){
        //console.log(data)
        this.title = data.summary
        this.description = data.description
        this.location = data.location
        this.#google_ingest_time(data)
        this.calendar_link = data.htmlLink
        this.iCal_UID = data.iCalUID
        this.last_updated = data.updated
    }

    #google_ingest_time(data){
        if(data .start != undefined){
            if (data.start.dateTime != undefined) { this.start = data.start.dateTime }
            else if (data.start.date != undefined) { this.start = data.start.date }
            else this.start = undefined
        }else{
            this.start = undefined
        }
        if(data .end != undefined){
            if (data.end.dateTime != undefined) { this.end = data.end.dateTime }
            else if (data.end.date != undefined) { this.end = data.end.date }
            else this.end = undefined
        }else{
            this.end = undefined
        }
    }

    toString(){
        return `${this.title} | ${this.location} | ${this.start} - ${this.end}`
    }
}

class Calendar {
    constructor(primary_source, community_sources, events) {
        this.primary_source
        this.community_sources
    }
}

function handleGoogleCalendarData(data) {
    let events = []
    data.items.forEach(event => {
        events.push(new Event(event, SourceType.google_calendar).toString() + "<br>" )
    });

    document.body.innerHTML = events
}

function fetchCalendarData(calendar, callback, timeMin, timeMax) {
    // Set Default Values for Dates as they're optional parameters.
    if (timeMin == undefined) { timeMin = "&timeMin=" + (new Date()).toISOString() } else { timeMin = "&timeMin=" + timeMin }
    if (timeMax == undefined) { timeMax = "" } else { timeMax = "&timeMax=" + timeMax }

    var requestUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar.google_calendar_ID}/events?callback=${callback}&key=${GOOGLE_CALENDAR_API_KEY}&showDeleted=False&singleEvents=True&orderBy=starttime${timeMin}${timeMax}`;
    console.log(requestUrl)
    var script = document.createElement('script');
    script.src = requestUrl;
    document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
    var page_calendar = new Calendar();

    var currentUrl = window.location.href;
    var url = new URL(currentUrl);
    var searchParams = url.searchParams;

    fetchCalendarData(QCS_CALENDAR_SOURCE, "handleGoogleCalendarData", searchParams.timeMin, searchParams.timeMax);
})