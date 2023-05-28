// Constants
const GOOGLE_CALENDAR_ID = 'queercalendarsheffield@gmail.com';
const GOOGLE_CALENDAR_API_KEY = 'AIzaSyCG_DrTXfD1Zrt2rCXsgc5-W0reHuPG49E';

function writeEventsToDOM(events) {
    var eventsContainer = document.getElementById('calendar-card-container');
    var modalsContainer = document.getElementById('event-modal-container');


    // Iterate over the events data array and create HTML div elements for each event
    events.forEach(function (event) {
        try{
            var eventDiv = document.createElement('div');
            eventDiv.classList.add('col');
            
            eventDiv.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <h4 class="card-title">${event.summary}</h4>
                </div>
                <div class="card-body">
                    <p class="card-text">
                        <span class="fw-bold">Location:</span> ${event.location}
                    </p>
                    <p class="card-text">
                        <span class="fw-bold">Start Time:</span> ${event.start.dateTime}
                    </p>
                    <p class="card-text">
                        <span class="fw-bold">End Time:</span> ${event.end.dateTime}
                    </p>
                    <p class="card-text text-truncate">${event.description}</p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal"
                        data-bs-target="#eventModal-${event.id}">More Information</button>
                </div>
            </div>
            `;

            console.log(eventDiv)

            // Append the event div to the container
            eventsContainer.appendChild(eventDiv);

            modalsContainer.innerHTML = modalsContainer.innerHTML + `
            <div class="modal fade" id="eventModal-${event.id}" tabindex="-1" aria-labelledby="eventModalLabel-${event.id}"
                aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="eventModalLabel-${event.id}">${event.summary}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p><span class="fw-bold">Location:</span> ${event.location}</p>
                            <p><span class="fw-bold">Start Time:</span> ${event.start.dateTime}</p>
                            <p><span class="fw-bold">End Time:</span> ${event.end.dateTime}</p>
                            <p>${event.description}</p>
                        </div>
                    </div>
                </div>
            </div>`
        }catch(error){
            console.log("Event Failed: ${error}")
        }
    });

    const eventModals = document.querySelectorAll('[id^="eventModal-"]');
    eventModals.forEach(function (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
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

document.addEventListener("DOMContentLoaded", function () {
    fetchCalendarData();
})