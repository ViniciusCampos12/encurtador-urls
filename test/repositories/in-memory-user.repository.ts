import { UserEntitiy } from "../../src/domain/entities/user.entity";
import { IUserRepository } from "../../src/domain/repositories/user.repository";

export class InMemoryUserRepository implements IUserRepository {
    public readonly users: UserEntitiy[] = [];

    async create(user: UserEntitiy): Promise<void> {
        this.users.push(user);
    }

    async findByEmail(email: string): Promise<UserEntitiy | null> {
        const user = this.users.find(item =>
            item.email === email
        );

        if (!user) {
            return null;
        }

        return user;
    }

    async findById(id: string): Promise<UserEntitiy | null> {
        const user = this.users.find(item =>
            item.id === id
        );

        if (!user) {
            return null;
        }

        return user;
    }

    async save(user: UserEntitiy): Promise<void> {
        const userIndex = this.users.findIndex(item =>
            item.id === user.id
        );

        if (userIndex >= 0) {
            this.users[userIndex] = user;
        }
    }

}