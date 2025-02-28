import { HttpEnum } from "../enums/http.enum.js";
import { ErrorManager } from "./error-manager.error.js";

export class ShortenUrlShortCodeExistsError extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.CONFLICT);
    }
}