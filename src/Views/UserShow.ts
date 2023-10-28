import { User, UserProps } from "../Models/User";
import { View } from "./View";

export class UserShow extends View<User<UserProps>, UserProps> {
    template(): string {
        return `
            <div>
                <h1>User Details</h1>
                <div>
                    <label>user name: ${this.model.get("name")} </label>
                </div>
                <div>
                    <label>user age: ${this.model.get("age")}</label>
                </div>
            </div>
        `;
    }
}
