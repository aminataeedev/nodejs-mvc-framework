export class Attributes<T> {
    constructor(private data: T) {}
    public get(propName: keyof T) {
        return this.data[propName];
    }
    public getData() {
        return this.data;
    }
    public set(_props: Partial<T>): void {
        this.data = { ...this.data, ..._props };
    }
}
