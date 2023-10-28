import { User } from "./Models/User";
import { UserForm } from "./Views/UserForm";
import { UserEdit } from "./Views/UserEdit";

const user = User.BuildUser({ id: 1, name: "amin", age: 25 });
const userForm = new UserEdit(document.querySelector("#parent"), user);
userForm.render();
