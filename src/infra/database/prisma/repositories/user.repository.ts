
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../../../../domain/repositories/user.repository";
import { UserEntitiy } from "../../../../domain/entities/user.entity";
import { UserMapper } from "../mappers/user.mapper";

export class UserRepository implements IUserRepository {
    private readonly prisma: PrismaClient = new PrismaClient();

    async create(user: UserEntitiy): Promise<void> {
        await this.prisma.user.create({
            data: UserMapper.toPrisma(user),
        })
    }

    async findByEmail(email: string): Promise<UserEntitiy | null> {
        const raw = await this.prisma.user.findUnique({
            where: {
                email,
            }
        })

        if (!raw) {
            return null;
        }

        return UserMapper.toDomain(raw);
    }

    async findById(id: string): Promise<UserEntitiy | null> {
        const raw = await this.prisma.user.findUnique({
            where: {
                id,
            }
        })

        if (!raw) {
            return null;
        }

        return UserMapper.toDomain(raw);
    }

    async save(user: UserEntitiy): Promise<void> {
        const raw = UserMapper.toPrisma(user);
        await this.prisma.user.update({
            where: {
                id: raw.id,
            },
            data: raw,
        });
    }


}