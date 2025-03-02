import { HttpEnum } from "../enums/http.enum";
import { ErrorManager } from "./error-manager.error";

export class ShortenUrlShortCodeExistsError extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.CONFLICT);
    }
}