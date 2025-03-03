import { ShortnedUrlEntitiy } from "../../src/domain/entities/shortned-url.entity";
import { IShortnedUrlRepository } from "../../src/domain/repositories/shortned-url.repository";

export class InMemoryShortnedUrlRepository implements IShortnedUrlRepository {
    public readonly shortnedUrls: ShortnedUrlEntitiy[] = [];

    async create(shortnedUrl: ShortnedUrlEntitiy): Promise<void> {
        this.shortnedUrls.push(shortnedUrl);
    }

    async findByShortCode(shortCode: string): Promise<ShortnedUrlEntitiy | null> {
        const shortnedUrl = this.shortnedUrls.find(item =>
            item.shortCode === shortCode
        );

        if (!shortnedUrl) {
            return null;
        }

        return shortnedUrl;
    }

    async save(shortnedUrl: ShortnedUrlEntitiy): Promise<void> {
        const shortnedUrlIndex = this.shortnedUrls.findIndex(item =>
            item.id === shortnedUrl.id
        );

        if (shortnedUrlIndex >= 0) {
            this.shortnedUrls[shortnedUrlIndex] = shortnedUrl;
        }
    }

    async getByUserId(userId: string): Promise<ShortnedUrlEntitiy[]> {
        return this.shortnedUrls.filter(item =>
            item.userId === userId
        );
    }

    async findByUserIdAndId(userId: string, id: string): Promise<ShortnedUrlEntitiy | null> {
        const shortnedUrl = this.shortnedUrls.find(item =>
            item.userId === userId && item.id === id
        );

        if (!shortnedUrl) {
            return null;
        }

        return shortnedUrl;
    }

}