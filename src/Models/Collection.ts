import { AxiosCRUD } from "../utils/axios";
import { Eventing } from "./Eventing";
import { User, UserProps } from "./User";
import { AxiosResponse } from "axios";

type collectionDeserializer<T, K> = (json: K) => T;

export class Collection<T, K> {
    // T: User, K: UserProps
    public models: T[];
    public events: Eventing;
    public rootURL: string;
    public deserializer: collectionDeserializer<T, K>;

    constructor(rootURL: string, deserializer: collectionDeserializer<T, K>) {
        this.rootURL = rootURL;
        this.models = [];
        this.events = new Eventing();
        this.deserializer = deserializer;
    }

    get on() {
        return this.events.on;
    }
    get trigget() {
        return this.events.trigger;
    }

    fetch = () => {
        AxiosCRUD.get({ url: this.rootURL, params: null }).then((response: AxiosResponse) => {
            this.models = response.data.map((user: K) => this.deserializer(user));
            this.trigget("change");
        });
    };
}
