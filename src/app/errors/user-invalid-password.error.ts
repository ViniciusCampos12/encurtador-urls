import { HttpEnum } from "../enums/http.enum.js";
import { ErrorManager } from "./error-manager.error.js";

export class UserInvalidPasswordError extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.UNAUTHORIZED);
    }
}