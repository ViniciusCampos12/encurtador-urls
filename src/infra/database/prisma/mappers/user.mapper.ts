import { User } from "@prisma/client";
import { UserEntitiy } from "../../../../domain/entities/user.entity";

export class UserMapper {
    static toPrisma(user: UserEntitiy) {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            loggedAt: user.loggedAt,
        }
    }

    static toDomain(user: User): UserEntitiy {
        return new UserEntitiy({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            loggedAt: user.loggedAt,
            updatedAt: user.updatedAt,
            createdAt: user.createdAt,
        });
    }
}