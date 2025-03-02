import { ShortnedUrlEntitiy } from './../../domain/entities/shortned-url.entity';
import { IShortnedUrlRepository } from "../../domain/repositories/shortned-url.repository";
import { ShortnedUrlNotFound } from "../errors/shortned-url-not-found.error";

interface IUserShortnedUrlDelete {
    userId: string
    id: string
}

export class UserShortnedUrlDeleteUseCase {
    constructor(private readonly shortnedUrlsRepository: IShortnedUrlRepository) { }

    async execute(params: IUserShortnedUrlDelete): Promise<void> {
        const { userId, id } = params;
        const userShortnedUrl = await this.shortnedUrlsRepository.findByUserIdAndId(userId, id);

        if (!userShortnedUrl) {
            throw new ShortnedUrlNotFound("Unable to delete url. Try again please");
        }
        const updateShortnedUrlEntitiy = new ShortnedUrlEntitiy({
            id: userShortnedUrl.id,
            shortCode: userShortnedUrl.shortCode,
            originalEndpoint: userShortnedUrl.originalEndpoint,
            shortnedEndpoint: userShortnedUrl.shortnedEndpoint,
            clicks: userShortnedUrl.clicks,
            deletedAt: new Date()
        })

        await this.shortnedUrlsRepository.save(updateShortnedUrlEntitiy);
    }
}