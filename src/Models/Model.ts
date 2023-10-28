import { AxiosPromise, AxiosResponse } from "axios";
import { Attributes } from "./Attributes";
import { EventCallback, Eventing } from "./Eventing";
import { Sync } from "./Sync";

interface IModel<T> {
    get(propName: keyof T): T[keyof T];
    getData: () => T;
    set: (_props: Partial<T>) => void;
    on: (eventName: string, callback: EventCallback) => void;
    trigger: (eventName: string) => void;
    fetch: (id: number) => AxiosPromise;
    save: () => Promise<void>;
}

export class Model<T extends { id?: number }> implements IModel<T> {
    constructor(public eventing: Eventing, public sync: Sync<T>, public attributes: Attributes<T>) {}

    get = (propName: keyof T) => {
        return this.attributes.get(propName);
    };
    getData = () => {
        return this.attributes.getData();
    };
    set = (_props: Partial<T>) => {
        this.attributes.set(_props);
        this.eventing.trigger("set");
    };
    on = this.eventing.on;
    trigger = this.eventing.trigger;
    fetch = this.sync.fetch;

    save = () => {
        return this.sync
            .save(this.getData())
            .then((response: AxiosResponse): void => {
                this.trigger("save");
            })
            .catch(() => this.trigger("error"));
    };
}
