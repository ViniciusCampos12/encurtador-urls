import { UserLoginUseCase } from './user-login.use-case';
import { InMemoryUserRepository } from './../../../test/repositories/in-memory-user.repository';
import { UserNotFoundError } from '../errors/user-not-found.error';
import { UserRegisterUseCase } from './user-register.use-case';
import { UserInvalidPasswordError } from '../errors/user-invalid-password.error';

describe("user login", () => {
    let userRepository: InMemoryUserRepository;
    let userLoginUseCase: UserLoginUseCase;

    beforeEach(async () => {
        userRepository = new InMemoryUserRepository();
        userLoginUseCase = new UserLoginUseCase(userRepository);
        process.env.JWT_SECRET = 'test-secret-key';
        const userRegisterUseCase = new UserRegisterUseCase(userRepository);
        const user = {
            name: "test",
            email: "test@example.com",
            password: "123456",
        };
        await userRegisterUseCase.execute(user);
    });

    it("should be able to log in", async () => {
        const userCredentials = {
            email: "test@example.com",
            password: "123456",
        };
        const token = await userLoginUseCase.execute(userCredentials);

        expect(userRepository.users[0].loggedAt).toEqual(
            expect.any(Date)
        );
        expect(token).toEqual(
            expect.any(String)
        );
    });

    it("should not be able to log in if the user doesn't exist", async () => {
        const user = {
            email: "test2@example.com",
            password: "123456",
        };

        await expect(userLoginUseCase.execute(user))
            .rejects
            .toThrow(UserNotFoundError);
    });


    it("should not be able to log in if the user's password doesn't match", async () => {
        const userCredentials = {
            email: "test@example.com",
            password: "12345",
        };
        
        await expect(userLoginUseCase.execute(userCredentials))
            .rejects
            .toThrow(UserInvalidPasswordError);
    });
});