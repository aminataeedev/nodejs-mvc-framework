import { User, UserProps } from "../Models/User";
import { View } from "./View";

export class UserForm extends View<User<UserProps>, UserProps> {
    generateRandomAge = () => {
        let _age = Math.random();
        this.model.set({ age: _age });
    };
    changeName = () => {
        const _name = (document.querySelector("#name_input") as HTMLInputElement)?.value || "";
        this.model.set({ name: _name });
    };
    onSave = () => {
        this.model.save();
    };
    public eventMap(): { [key: string]: () => void } {
        return {
            ".changeNameButton:click": this.changeName,
            ".generateRandomAge:click": this.generateRandomAge,
            "#save:click": this.onSave,
        };
    }
    public template(): string {
        return `
            <form>
                <h1>UserForm</h1>
                <input id="name_input" placeholder='${this.model.get("name")}'/>
                <button class="generateRandomAge">generate new age</button>
                <button class="changeNameButton">change name</button>
                <button id="save">save</button>
            </form>
        `;
    }
}
