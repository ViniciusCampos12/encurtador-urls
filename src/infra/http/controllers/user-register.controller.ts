import { UserExistsError } from "../../../app/errors/user-exists.error";
import { UserRegisterUseCase } from "../../../app/use-cases/user-register.use-case";
import { UserRegisterDto } from "../dtos/user-register.dto";

export class UserRegisterController {
    constructor(private readonly userRegisterUseCase: UserRegisterUseCase) { }

    async handle(body: UserRegisterDto): Promise<void> {
        try {
           await this.userRegisterUseCase.execute(body);
        } catch (err) {
            if (err instanceof UserExistsError) {
                throw err;
            }
            throw new Error(err.message);
        }
    }
}