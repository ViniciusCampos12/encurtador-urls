import { HttpEnum } from "../enums/http.enum";
import { ErrorManager } from "./error-manager.error";

export class UserInvalidPasswordError extends ErrorManager {
    constructor(message: string) {
        super(message, HttpEnum.UNAUTHORIZED);
    }
}