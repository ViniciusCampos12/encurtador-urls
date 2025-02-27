
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../../../domain/repositories/user.repository.js";
import { UserEntitiy } from "../../../../domain/entities/user.entity.js";
import { UserMapper } from "../mappers/user.mapper.js";

export class UserRepository implements IUserRepository {
    private readonly prisma: PrismaClient = new PrismaClient();

    async create(user: UserEntitiy): Promise<void> {
        await this.prisma.user.create({
            data: UserMapper.toPrisma(user),
        })
    }
    findByEmail(email: string): Promise<UserEntitiy> {
        throw new Error("Method not implemented.");
    }


}