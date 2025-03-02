import { ShortnedUrlNotFound } from "../../../app/errors/shortned-url-not-found.error";
import { UserShortnedUrlEditUseCase } from "../../../app/use-cases/user-shortned-url-edit.use-case";
import { UserEntitiy } from "../../../domain/entities/user.entity";
import { UserShortnedUrlEditDto } from "../dtos/user-shortned-url-edit.dto";

export class UserShortnedUrlEditController {
    constructor(private readonly userShortnedUrlEditUseCase: UserShortnedUrlEditUseCase) { }

    async handle(user: UserEntitiy, id: string, body: UserShortnedUrlEditDto): Promise<void> {
        try {
            const { originalEndpoint } = body;
            await this.userShortnedUrlEditUseCase.execute({
                userId: user.id,
                id,
                originalEndpoint
            })
        } catch (err) {
            if (err instanceof ShortnedUrlNotFound) {
                throw err;
            }

            throw new Error(err.message);
        }
    }
}