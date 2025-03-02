import { ShortnedUrlEntitiy } from "../../domain/entities/shortned-url.entity";
import { IShortnedUrlRepository } from "../../domain/repositories/shortned-url.repository"
import { ShortnedUrlNotFound } from "../errors/shortned-url-not-found.error";

interface IUserShortnedUrlEdit {
    userId: string
    id: string
    originalEndpoint: string
}

export class UserShortnedUrlEditUseCase {
    constructor(private readonly shortnedUrlsRepository: IShortnedUrlRepository) { }

    async execute(params: IUserShortnedUrlEdit): Promise<void> {
        const { userId, id, originalEndpoint } = params;
        const userShortnedUrl = await this.shortnedUrlsRepository.findByUserIdAndId(userId, id);

        if (!userShortnedUrl) {
            throw new ShortnedUrlNotFound("Unable to update url. Try again please");
        }
        const updateShortnedUrlEntitiy = new ShortnedUrlEntitiy({
            id: userShortnedUrl.id,
            shortCode: userShortnedUrl.shortCode,
            originalEndpoint,
            shortnedEndpoint: userShortnedUrl.shortnedEndpoint,
            clicks: userShortnedUrl.clicks,
        })

        await this.shortnedUrlsRepository.save(updateShortnedUrlEntitiy);
    }
}
