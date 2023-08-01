import { time } from 'console';
import { googleEventObject } from './calendar_interfaces/googleEvent';

export class Event {
    id: string;
    summary: string;
    description?: string;
    location: string;
    startTime!: Date;
    endTime!: Date;
    allDay!: boolean;

    constructor(googleEventObject: googleEventObject);
    constructor(
        id: string,
        summary: string,
        description: string,
        location: string,
        start: Date,
        end: Date,
        allDay: boolean
    );
    constructor(...args: any[]) {
        if ('googleEventObject' in args) {
            const { id, summary, description, location, start, end } = args.googleEventObject as googleEventObject;
            this.id = id;
            this.summary = summary;
            this.description = description;
            this.location = location;
            this.setTime(start, end);
        } else {
            this.id = args[0];
            this.summary = args[1];
            this.description = args[2];
            this.location = args[3];
            this.startTime = args[4];
            this.endTime = args[5];
            this.allDay = args[6];
        }
    };

    setTime(
        start: { dateTime?: string; date?: string },
        end: { dateTime?: string; date?: string }
        ) {

        if (start.date !== undefined && end.date !== undefined) {
            this.allDay = true;
            this.startTime = new Date(start.date);
            this.endTime = new Date(end.date);
        }else if(start.dateTime !== undefined && end.dateTime !== undefined){
            this.allDay = true;
            this.startTime = new Date(start.dateTime);
            this.endTime = new Date(end.dateTime);
        }else{
            throw new Error(`Google event time in unexpected format, expected either 'date' or 'dateTime' to be set for both 'start' and 'end': ${start} ${end}`)
        }
    }
}