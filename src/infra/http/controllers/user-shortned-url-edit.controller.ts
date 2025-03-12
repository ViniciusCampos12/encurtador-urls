import { z } from "zod";
import { UserShortnedUrlEditUseCase } from "../../../app/use-cases/user-shortned-url-edit.use-case";
import { Request, Response, NextFunction } from 'express';
import { UserEntitiy } from "../../../domain/entities/user.entity";

interface UserShortnedUrlsEditResponse {
    status: 'successfully update.'
}

export class UserShortnedUrlEditController {
    constructor(private readonly userShortnedUrlEditUseCase: UserShortnedUrlEditUseCase) { }

    async handle(req: Request, res: Response<UserShortnedUrlsEditResponse>, next: NextFunction): Promise<void> {
        try {
            const userShortnedUrlIdSchema = z.object({
                id: z.string().uuid()
            });
            const userShortnedUrlBodySchema = z.object({
                originalEndpoint: z.string().url()
            });
            const user = req.user as UserEntitiy;
            const { id } = userShortnedUrlIdSchema.parse(req.params);
            const { originalEndpoint } = userShortnedUrlBodySchema.parse(req.body);

            await this.userShortnedUrlEditUseCase.execute({
                userId: user.id,
                id,
                originalEndpoint
            })
            
            res.status(200).json({
                status: "successfully update."
            });
        } catch (err) {
            next(err);
        }
    }
}