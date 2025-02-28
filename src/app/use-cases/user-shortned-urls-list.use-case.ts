import { ShortnedUrlEntitiy } from "../../domain/entities/shortned-url.entity.js";
import { IShortnedUrlRepository } from "../../domain/repositories/shortned-url.repository.js";

export class UserShortnedUrlsListUseCase {
    constructor(private readonly shortnedUrlsRepository: IShortnedUrlRepository) { }

    async execute(userId: string): Promise<ShortnedUrlEntitiy[]> {
        const shortnedUrls = await this.shortnedUrlsRepository.getByUserId(userId);
        return shortnedUrls;
    }
}