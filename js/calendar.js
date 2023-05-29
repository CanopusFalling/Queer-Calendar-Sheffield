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

class Calendar {
    constructor(primary_source, community_sources, events) {
        this.primary_source
        this.community_sources
    }
}

function handleCalendarData(data){
    console.log(data.items)
    data.items.forEach(event => {
        try{
            console.log(event.start.dateTime)
        }catch{
            console.log(event)
        }
    });
}

function fetchCalendarData(calendar, callback, timeMin, timeMax) {
    // Set Default Values for Dates as they're optional parameters.
    if (timeMin == undefined) {timeMin = "&timeMin=" + (new Date()).toISOString()} else {timeMin = "&timeMin=" + timeMin}
    if (timeMax == undefined) {timeMax = ""} else {timeMax = "&timeMax=" + timeMax}

    var requestUrl = `https://www.googleapis.com/calendar/v3/calendars/${calendar.google_calendar_ID}/events?callback=${callback}&key=${GOOGLE_CALENDAR_API_KEY}&showDeleted=False&singleEvents=True&orderBy=starttime${timeMin}${timeMax}`;
    console.log(requestUrl)
    var script = document.createElement('script');
    script.src = requestUrl;
    document.body.appendChild(script);
}

document.addEventListener("DOMContentLoaded", function () {
    var page_calendar  = new Calendar();

    var currentUrl = window.location.href;
    var url = new URL(currentUrl);
    var searchParams = url.searchParams;

    fetchCalendarData(QCS_CALENDAR_SOURCE, "handleCalendarData", searchParams.timeMin, searchParams.timeMax)
})