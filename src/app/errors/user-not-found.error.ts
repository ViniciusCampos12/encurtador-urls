import { HttpEnum } from "../enums/http.enum.js";
import { ErrorManager } from "./error-manager.error.js";

export class UserNotFoundError extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.NOT_FOUND);
    }
}