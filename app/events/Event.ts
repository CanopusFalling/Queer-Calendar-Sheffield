export interface Event {
    id: string;
    summary: string;
    description: string;
    location: string;
    htmlLink: string;
    start: {
        dateTime?: string;
        date?: string;
    };
    end: {
        dateTime?: string;
        date?: string;
    };
}