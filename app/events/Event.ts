import { googleEventObject } from './calendar_interfaces/googleEvent';

export class Event {
    id: string;
    summary: string;
    description?: string;
    location: string;
    start: { dateTime?: string; date?: string };
    end: { dateTime?: string; date?: string };

    constructor(googleEventObject: googleEventObject);
    constructor(
        id: string,
        summary: string,
        description: string,
        location: string,
        start: { dateTime?: string; date?: string },
        end: { dateTime?: string; date?: string }
    );
    constructor(...args: any[]){
        if ('googleEventObject' in args) {
            const {id, summary, description, location, start, end} = args.googleEventObject as googleEventObject;
            this.id = id;
            this.summary = summary;
            this.description = description;
            this.location = location;
            this.start = start;
            this.end = end;
        }else{
            this.id = args[0];
            this.summary = args[1];
            this.description = args[2];
            this.location = args[3];
            this.start = args[4];
            this.end = args[5];
        }
    };
}