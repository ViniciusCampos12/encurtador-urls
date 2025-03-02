import { HttpEnum } from "../enums/http.enum";
import { ErrorManager } from "./error-manager.error";

export class UserNotFoundError extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.NOT_FOUND);
    }
}