export type EventCallback = () => void;

interface ModelEvent {
    name: string;
    callbacks: EventCallback[];
}

export class Eventing {
    public events: ModelEvent[] = [];
    on = (eventName: string, callback: EventCallback) => {
        let eventIndex = this.events.findIndex((event: ModelEvent) => event.name === eventName);
        if (eventIndex > -1) this.events[eventIndex].callbacks = [...this.events[eventIndex].callbacks, callback];
        else this.events.push({ name: eventName, callbacks: [callback] });
    };
    trigger = (eventName: string) => {
        let eventIndex = this.events.findIndex((event: ModelEvent) => event.name === eventName);
        if (eventIndex > -1)
            this.events[eventIndex].callbacks.forEach((callback) => {
                callback();
            });
    };
}
