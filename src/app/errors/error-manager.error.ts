export class ErrorManager extends Error {
    public readonly statusCode: number;
    constructor(message: string, code: number) {
        super(message);
        this.statusCode = code;
    }
}