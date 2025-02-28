import { HttpEnum } from "../enums/http.enum.js";
import { ErrorManager } from "./error-manager.error.js";

export class ShortnedUrlNotFound extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.NOT_FOUND);
    }
}