// Constants
const GOOGLE_CALENDAR_ID = 'queercalendarsheffield@gmail.com';
const GOOGLE_CALENDAR_API_KEY = 'AIzaSyCG_DrTXfD1Zrt2rCXsgc5-W0reHuPG49E';

function writeEventsToDOM(events) {
    var eventsContainer = document.getElementById('calendar-events');

    // Iterate over the events data array and create HTML div elements for each event
    events.forEach(function (event) {
        var eventDiv = document.createElement('div');
        eventDiv.classList.add('event');

        // Event properties
        var summary = event.summary;
        var startDateTime = event.start.dateTime;
        var endDateTime = event.end.dateTime;
        var location = event.location;
        var description = event.description;

        // Populate the event div with the properties
        var eventHTML = '<h2>' + summary + '</h2>';
        eventHTML += '<p><strong>Start:</strong> ' + startDateTime + '</p>';
        eventHTML += '<p><strong>End:</strong> ' + endDateTime + '</p>';
        eventHTML += '<p><strong>Location:</strong> ' + location + '</p>';
        eventHTML += '<p><strong>Description:</strong> ' + description + '</p>';

        eventDiv.innerHTML = eventHTML;

        // Append the event div to the container
        eventsContainer.appendChild(eventDiv);
    });
}

function handleCalendarData(data) {
    var events = data.items;
    console.log(events); // Handle the events data as needed

    writeEventsToDOM(events)
}

function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = callback;
    document.body.appendChild(script);
}

function fetchCalendarData() {
    var requestUrl = 'https://www.googleapis.com/calendar/v3/calendars/' + GOOGLE_CALENDAR_ID + '/events?callback=handleCalendarData&key=' + GOOGLE_CALENDAR_API_KEY;

    loadScript(requestUrl, function () {
        console.log('Calendar data loaded.');
    });
}



window.onload = fetchCalendarData;