import { PrismaClient } from "@prisma/client";
import { IShortnedUrlRepository } from "../../../../domain/repositories/shortned-url.repository";
import { ShortnedUrlEntitiy } from "../../../../domain/entities/shortned-url.entity";
import { ShortnedUrlMapper } from "../mappers/shortned-url.mapper";

export class ShortnedUrlRepository implements IShortnedUrlRepository {
    private readonly prisma: PrismaClient = new PrismaClient();

    async create(shortnedUrl: ShortnedUrlEntitiy): Promise<void> {
        await this.prisma.shortnedUrl.create({
            data: ShortnedUrlMapper.toPrisma(shortnedUrl),
        })
    }

    async findByShortCode(shortCode: string): Promise<ShortnedUrlEntitiy | null> {
        const raw = await this.prisma.shortnedUrl.findUnique({
            where: {
                shortCode,
                deletedAt: null
            }
        })

        if (!raw) {
            return null;
        }

        return ShortnedUrlMapper.toDomain(raw);
    }

    async save(shortnedUrl: ShortnedUrlEntitiy): Promise<void> {
        const raw = ShortnedUrlMapper.toPrisma(shortnedUrl);
        await this.prisma.shortnedUrl.update({
            where: {
                id: raw.id,
                deletedAt: null
            },
            data: raw,
        });
    }

    async getByUserId(userId: string): Promise<ShortnedUrlEntitiy[]> {
        const shortnedUrls = await this.prisma.shortnedUrl.findMany({
            where: {
                userId: userId,
                deletedAt: null
            }
        })

        return shortnedUrls.map(ShortnedUrlMapper.toDomain);
    }

    async findByUserIdAndId(userId: string, id: string): Promise<ShortnedUrlEntitiy | null> {
        const raw = await this.prisma.shortnedUrl.findUnique({
            where: {
                userId,
                id,
                deletedAt: null
            }
        })

        if (!raw) {
            return null;
        }

        return ShortnedUrlMapper.toDomain(raw);
    }
}