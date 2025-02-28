import { IUserRepository } from "../../domain/repositories/user.repository.js";
import { UserInvalidPasswordError } from "../errors/user-invalid-password.error.js";
import { UserNotFoundError } from "../errors/user-not-found.error.js";
import { HashPasswordHelper } from "../helpers/hash-password.helper.js";
import jwt from "jsonwebtoken";

interface IUserLogin {
    email: string;
    password: string;
}

export class UserLoginUseCase {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(params: IUserLogin): Promise<string> {
        const { email, password } = params;
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new UserNotFoundError("User not found!");
        }

        const passwordMatches = HashPasswordHelper.comparePassword(password, user.password);

        if (!passwordMatches) {
            throw new UserInvalidPasswordError("Invalid credentials. Check your password");
        }

        user.loggedAt = new Date();
        await this.userRepository.save(user);

        const token = jwt.sign({ sub: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;
    }
}