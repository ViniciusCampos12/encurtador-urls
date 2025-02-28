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
            throw new Error(err.message);
        }
    }
}