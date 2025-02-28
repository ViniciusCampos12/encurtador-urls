import { ShortnedUrlEntitiy } from "../entities/shortned-url.entity.js";

export abstract class IShortnedUrlRepository {
    abstract create(shortnedUrl: ShortnedUrlEntitiy): Promise<void>;
    abstract findByShortCode(shortCode: string): Promise<ShortnedUrlEntitiy | null>;
    abstract save(shortnedUrl: ShortnedUrlEntitiy): Promise<void>;
    abstract getByUserId(userId: string): Promise<ShortnedUrlEntitiy[]>;
}