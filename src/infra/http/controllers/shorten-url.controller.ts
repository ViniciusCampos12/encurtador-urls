import { ShortenUrlShortCodeExistsError } from "../../../app/errors/shorten-url-short-code-exists.error.js";
import { ShortenUrlUseCase } from "../../../app/use-cases/shorten-url.use-case.js";
import { UserEntitiy } from "../../../domain/entities/user.entity.js";
import { ShortenUrlDto } from "../dtos/shorten-url.dto.js";

interface ShortenUrlResponse {
    url: string
}

export class ShortenUrlController {
    constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) { }

    async handle(body: ShortenUrlDto, user: UserEntitiy | null): Promise<ShortenUrlResponse> {
        try {
            const { originalEndpoint } = body;
            const url = await this.shortenUrlUseCase.execute({ originalEndpoint, user });
            return { url: url };
        } catch (err) {
            if (err instanceof ShortenUrlShortCodeExistsError) {
                throw err;
            }
            throw new Error(err.message);
        }
    }
}