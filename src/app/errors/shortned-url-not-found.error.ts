import { HttpEnum } from "../enums/http.enum";
import { ErrorManager } from "./error-manager.error";

export class ShortnedUrlNotFound extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.NOT_FOUND);
    }
}