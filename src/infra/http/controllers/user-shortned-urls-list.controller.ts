import { Request, Response, NextFunction } from "express";
import { UserShortnedUrlsListUseCase } from "../../../app/use-cases/user-shortned-urls-list.use-case";
import { UserEntitiy } from "../../../domain/entities/user.entity";

interface UserShortnedUrlsListResponse {
    'shortned-urls': {
        id: string
        originalEndpoint: string
        shortnedEndpoint: string
        clicks: number
        updatedAt: Date
    }[]
}

export class UserShortnedUrlsListController {
    constructor(private readonly userShortnedUrlsListUseCase: UserShortnedUrlsListUseCase) { }

    async handle(req: Request, res: Response<UserShortnedUrlsListResponse>, next: NextFunction): Promise<void> {
        try {
            const user = req.user as UserEntitiy;
            const userShortnedUrlsList = await this.userShortnedUrlsListUseCase.execute(user.id);
            const list = userShortnedUrlsList.map(userShortnedUrl => {
                return {
                    id: userShortnedUrl.id,
                    originalEndpoint: userShortnedUrl.originalEndpoint,
                    shortnedEndpoint: userShortnedUrl.shortnedEndpoint,
                    clicks: userShortnedUrl.clicks,
                    updatedAt: userShortnedUrl.updatedAt,
                }
            });

            res.status(200).json({
                "shortned-urls": list
            });
        } catch (err) {
            next(err);
        }
    }
}