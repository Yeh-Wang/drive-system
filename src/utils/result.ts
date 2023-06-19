export class result<T> {
    private data: T;
    private code: number;
    private msg: string;
    constructor(data: T, code: number, msg: string) {
        this.data = data;
        this.code = code;
        this.msg = msg;
    }
}
