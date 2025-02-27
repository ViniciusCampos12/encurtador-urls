import { UserEntitiy } from "../../domain/entities/user.entity.js";
import { IUserRepository } from "../../domain/repositories/user.repository.js";
import { UserExistsError } from "../errors/user-exists.error.js";
import { HashPasswordHelper } from "../helpers/hash-password.helper.js";

interface IUserRegister {
    name: string;
    email: string;
    password: string;
}

export class UserRegisterUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(params: IUserRegister): Promise<void> {
        const { name, email, password } = params;

        const userExists = await this.userRepository.findByEmail(email);

        if (userExists) {
            throw new UserExistsError('User already exists!');
        }

        const hashedPassword = await HashPasswordHelper.cryptPassword(password);
        const user = new UserEntitiy({
            name,
            email,
            password: hashedPassword
        })

        await this.userRepository.create(user);
    }
}