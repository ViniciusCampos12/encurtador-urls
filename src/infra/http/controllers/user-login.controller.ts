import { UserInvalidPasswordError } from "../../../app/errors/user-invalid-password.error.js";
import { UserNotFoundError } from "../../../app/errors/user-not-found.error.js";
import { UserLoginUseCase } from "../../../app/use-cases/user-login.use-case.js";
import { UserLoginDto } from "../dtos/user-login.dto.js";

interface UserLoginResponse {
    jwt: string
}

export class UserLoginController {
    constructor(private readonly userLoginUseCase: UserLoginUseCase) { }

    async handle(body: UserLoginDto): Promise<UserLoginResponse> {
        try {
            const { email, password } = body;
            const token = await this.userLoginUseCase.execute({
                email,
                password
            })
            return { jwt: token }
        } catch (err) {
            if (err instanceof UserNotFoundError || err instanceof UserInvalidPasswordError) {
                throw err;
            }
            throw new Error(err.message);
        }
    }
}