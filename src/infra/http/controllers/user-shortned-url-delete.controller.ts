import { z } from "zod";
import { UserShortnedUrlDeleteUseCase } from "../../../app/use-cases/user-shortned-url-delete.use-case";
import { UserEntitiy } from "../../../domain/entities/user.entity";
import { Request, Response, NextFunction } from 'express';

export class UserShortnedUrlDeleteController {
    constructor(private readonly userShortnedUrlDeleteUseCase: UserShortnedUrlDeleteUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user as UserEntitiy;
            const userShortnedUrlSchema = z.object({
                id: z.string().uuid()
            });
            const { id } = userShortnedUrlSchema.parse(req.params);

            await this.userShortnedUrlDeleteUseCase.execute({
                userId: user.id,
                id
            })
            
            res.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}