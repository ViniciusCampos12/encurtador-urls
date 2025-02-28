import { ShortnedUrlEntitiy } from './../../domain/entities/shortned-url.entity.js';
import { IShortnedUrlRepository } from "../../domain/repositories/shortned-url.repository.js";
import { UserEntitiy } from '../../domain/entities/user.entity.js';
import { ShortenUrlShortCodeExistsError } from '../errors/shorten-url-short-code-exists.error.js';

interface IShortenUrl {
    originalEndpoint: string;
    user: UserEntitiy | null;
}

export class ShortenUrlUseCase {
    constructor(private readonly shortnedUrlRepository: IShortnedUrlRepository) { }

    async execute(params: IShortenUrl): Promise<string> {
        const { originalEndpoint, user } = params;
        const shortCode = ShortnedUrlEntitiy.generateShortCode();
        const shortCodeExists = await this.shortnedUrlRepository.findByShortCode(shortCode);

        if (shortCodeExists) {
            throw new ShortenUrlShortCodeExistsError("Unable to generate url. Try again please");
        }

        const shortnedEndpoint = process.env.APP_URL + `/${shortCode}`
        const shortnedUrlEntitiy = new ShortnedUrlEntitiy({
            originalEndpoint,
            shortnedEndpoint,
            shortCode,
            clicks: 0,
            userId: user?.id
        })

        await this.shortnedUrlRepository.create(shortnedUrlEntitiy);
        return shortnedEndpoint;
    }
}