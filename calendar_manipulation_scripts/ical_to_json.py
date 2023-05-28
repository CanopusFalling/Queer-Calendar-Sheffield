import requests
from icalendar import Calendar, vDDDTypes, vText, vUri, vRecur
import json

def convert_ical_value(value):
    if isinstance(value, vDDDTypes):
        return value.dt.strftime("%Y-%m-%d %H:%M:%S")
    elif isinstance(value, vText) or isinstance(value, vUri):
        return str(value)
    elif isinstance(value, vRecur):
        return value.to_ical().decode()
    else:
        return str(value)

# Queer Calendar Sheffield ICAL link
QCS_ICAL = "https://calendar.google.com/calendar/ical/queercalendarsheffield%40gmail.com/public/basic.ics"

# Fetch the ICAL data
response = requests.get(QCS_ICAL)
ical_data = response.text

# Parse the ICAL data
calendar = Calendar.from_ical(ical_data)

# Convert the events to a list of dictionaries
events = []
for component in calendar.walk():
    if component.name == "VEVENT":
        event = {}
        for key, value in component.items():
            event[key] = convert_ical_value(value)
        events.append(event)

# Write events to a JSON file
with open("events.json", "w") as json_file:
    json.dump(events, json_file)
