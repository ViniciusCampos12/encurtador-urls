import { PrismaClient } from "@prisma/client";
import { IShortnedUrlRepository } from "../../../../domain/repositories/shortned-url.repository.js";
import { ShortnedUrlEntitiy } from "../../../../domain/entities/shortned-url.entity.js";
import { ShortnedUrlMapper } from "../mappers/shortned-url.mapper.js";

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
            },
            data: raw,
        });
    }
}