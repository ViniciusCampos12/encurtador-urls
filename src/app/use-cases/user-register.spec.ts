import { UserRegisterUseCase } from './user-register.use-case';
import { InMemoryUserRepository } from './../../../test/repositories/in-memory-user.repository';
import { UserExistsError } from '../errors/user-exists.error';

describe("user register", () => {
    let userRepository: InMemoryUserRepository;
    let userRegisterUseCase: UserRegisterUseCase;

    beforeEach(() => {
        userRepository = new InMemoryUserRepository();
        userRegisterUseCase = new UserRegisterUseCase(userRepository);
    });

    it("should be able to create a new user", async () => {
        const user = {
            name: "test",
            email: "test@example.com",
            password: "123456",
        };
        await userRegisterUseCase.execute(user)

        expect(userRepository.users).toHaveLength(1);
    });

    it("should not be able to create a new user if it already exists", async () => {
        const newUser = {
            name: "test",
            email: "test@example.com",
            password: "123456"
        };
        await userRegisterUseCase.execute(newUser);
        
        await expect(userRegisterUseCase.execute(newUser))
            .rejects
            .toThrow(UserExistsError);
    });
});