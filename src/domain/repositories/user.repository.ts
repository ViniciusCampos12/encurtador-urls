import { UserEntitiy } from "../entities/user.entity.js";

export abstract class IUserRepository {
    abstract create(user: UserEntitiy): Promise<void>;
    abstract findByEmail(email: string): Promise<UserEntitiy | null>;
    abstract findById(id: string): Promise<UserEntitiy | null>;
    abstract save(user: UserEntitiy): Promise<void>;
}