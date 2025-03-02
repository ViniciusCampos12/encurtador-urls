import { ShortnedUrlNotFound } from "../../../app/errors/shortned-url-not-found.error";
import { UserShortnedUrlDeleteUseCase } from "../../../app/use-cases/user-shortned-url-delete.use-case";
import { UserEntitiy } from "../../../domain/entities/user.entity";

export class UserShortnedUrlDeleteController {
    constructor(private readonly userShortnedUrlDeleteUseCase: UserShortnedUrlDeleteUseCase) { }

    async handle(user: UserEntitiy, id: string): Promise<void> {
        try {
            await this.userShortnedUrlDeleteUseCase.execute({
                userId: user.id,
                id
            })
        } catch (err) {
            if (err instanceof ShortnedUrlNotFound) {
                throw err;
            }

            throw new Error(err.message);
        }
    }
}