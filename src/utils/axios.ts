import axios, { AxiosResponse } from "axios";

interface IRequest<T> {
    url: string;
    params: T;
}

export class AxiosCRUD {
    public static async get<T>(request: IRequest<T>): Promise<AxiosResponse> {
        return axios.get(request.url, { params: request.params });
    }
    public static post<T>(request: IRequest<T>): Promise<AxiosResponse> {
        return axios.post(request.url, request.params);
    }
    public static put<T>(request: IRequest<T>): Promise<AxiosResponse> {
        return axios.put(request.url, request.params);
    }
}
