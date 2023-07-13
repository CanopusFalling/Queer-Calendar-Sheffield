enum EventStatus {
    "confirmed",
    "tentative",
    "cancelled"
}

class CalendarEvent {
    constructor(
        private title: string,
        private description: string,
        private startTime: Date,
        private endTime: Date,
        private location: string,
        private status: EventStatus,
    ) {}
}
