import { ShortnedUrl } from "@prisma/client";
import { ShortnedUrlEntitiy } from "../../../../domain/entities/shortned-url.entity";

export class ShortnedUrlMapper {
    static toPrisma(shortnedUrl: ShortnedUrlEntitiy) {
        return {
            id: shortnedUrl.id,
            shortCode: shortnedUrl.shortCode,
            originalEndpoint: shortnedUrl.originalEndpoint,
            shortnedEndpoint: shortnedUrl.shortnedEndpoint,
            userId: shortnedUrl.userId,
            clicks: shortnedUrl.clicks,
            deletedAt: shortnedUrl.deletedAt,
        }
    }

    static toDomain(shortnedUrl: ShortnedUrl): ShortnedUrlEntitiy {
        return new ShortnedUrlEntitiy({
            id: shortnedUrl.id,
            shortCode: shortnedUrl.shortCode,
            originalEndpoint: shortnedUrl.originalEndpoint,
            shortnedEndpoint: shortnedUrl.shortnedEndpoint,
            userId: shortnedUrl.userId,
            clicks: Number(shortnedUrl.clicks),
            updatedAt: shortnedUrl.updatedAt,
            createdAt: shortnedUrl.createdAt,
            deletedAt: shortnedUrl.deletedAt,
        });
    }
}