import { AxiosPromise, AxiosResponse } from "axios";
import { AxiosCRUD } from "../utils/axios";
import { IGetUserParams } from "./User";

export class Sync<T> {
    constructor(public baseURL: string) {}
    fetch = async (id: number): AxiosPromise => {
        return AxiosCRUD.get<IGetUserParams>({ url: this.baseURL, params: { id } });
    };

    save = async (data: T) => {
        if (data.id) return AxiosCRUD.put<T>({ url: this.baseURL + `/${data.id}`, params: data });
        return AxiosCRUD.post<T>({ url: this.baseURL, params: data });
    };
}
