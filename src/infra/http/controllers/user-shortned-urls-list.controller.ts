import { UserShortnedUrlsListUseCase } from "../../../app/use-cases/user-shortned-urls-list.use-case.js";
import { UserEntitiy } from "../../../domain/entities/user.entity.js";

interface UserShortnedUrlsListResponse {
    id: string
    originalEndpoint: string
    shortnedEndpoint: string
    clicks: number
    updatedAt: Date
}

export class UserShortnedUrlsListController {
    constructor(private readonly userShortnedUrlsListUseCase: UserShortnedUrlsListUseCase) { }

    async handle(user: UserEntitiy): Promise<UserShortnedUrlsListResponse[]> {
        try {
            const userShortnedUrlsList = await this.userShortnedUrlsListUseCase.execute(user.id);
            return userShortnedUrlsList.map(userShortnedUrl => {
                return {
                    id: userShortnedUrl.id,
                    originalEndpoint: userShortnedUrl.originalEndpoint,
                    shortnedEndpoint: userShortnedUrl.shortnedEndpoint,
                    clicks: userShortnedUrl.clicks,
                    updatedAt: userShortnedUrl.updatedAt,
                }
            })
        } catch (err) {
            throw new Error(err.message);
        }
    }
}