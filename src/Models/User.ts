import { Model } from "./Model";
import { Eventing } from "./Eventing";
import { Sync } from "./Sync";
import { Attributes } from "./Attributes";
import { Collection } from "./Collection";

export interface UserProps {
    id?: number;
    name?: string;
    age?: number;
}

export interface IGetUserParams {
    id: number;
}

export interface ICreateUserParams {
    name?: string;
    age?: number;
}

export interface IUpdateUserParams {
    name?: string;
    age?: number;
}

export class User<T extends { id?: number }> extends Model<T> {
    static BuildUser(attrs: UserProps) {
        return new Model(new Eventing(), new Sync("http://localhost:3000/users"), new Attributes<UserProps>(attrs));
    }
    static BuildCollection() {
        return new Collection("http://localhost:3000/users", (json: UserProps) => User.BuildUser(json));
    }
}
