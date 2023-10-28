import { Model } from "../Models/Model";

export abstract class View<T extends Model<K>, K extends { id?: number }> {
    // T: model
    // K: UserProps
    parent: Element | null;
    model: T;
    regions: { [key: string]: Element | null } = {};
    constructor(parent: Element | null, model: T) {
        this.parent = parent;
        this.model = model;
        this.model.on("set", this.render);
    }
    abstract template(): string;
    onRender(): void {}
    render = () => {
        const template = document.createElement("template");
        template.innerHTML = this.template();
        this.eventBinder(template.content);
        if (this.parent) {
            this.parent.innerHTML = "";
            this.mapRegions(template.content);
            this.onRender();
            this.parent.append(template.content);
        }
    };
    eventMap(): { [key: string]: () => void } {
        return {};
    }
    regionsMap(): { [key: string]: string } {
        return {};
    }
    mapRegions(fragment: DocumentFragment) {
        const regionsObj = this.regionsMap();
        Object.keys(regionsObj).forEach((regionKey: string) => {
            this.regions[regionKey] = fragment.querySelector(regionsObj[regionKey]);
        });
    }
    public eventBinder(fragment: DocumentFragment) {
        const events = this.eventMap();
        Object.keys(events).forEach((eventKey) => {
            const element: string = eventKey.split(":")[0];
            const DOMEvent: string = eventKey.split(":")[1];
            fragment.querySelectorAll(element).forEach((element: Element) => {
                element.addEventListener(DOMEvent, (e: Event) => {
                    e.preventDefault();
                    events[eventKey]();
                });
            });
        });
    }
}
