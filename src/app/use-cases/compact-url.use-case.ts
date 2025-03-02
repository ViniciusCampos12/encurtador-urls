import { IShortnedUrlRepository } from '../../domain/repositories/shortned-url.repository';
import { ShortnedUrlNotFound } from '../errors/shortned-url-not-found.error';

export class CompactUrlUseCase {
    constructor(private readonly shortnedUrlRepository: IShortnedUrlRepository) { }

    async execute(shortCode: string): Promise<string> {
        const shortnedUrl = await this.shortnedUrlRepository.findByShortCode(shortCode);

        if (!shortnedUrl) {
            throw new ShortnedUrlNotFound("Unable to access url. Try again please");
        }
        
        shortnedUrl.addClick();
        await this.shortnedUrlRepository.save(shortnedUrl);
        return shortnedUrl.originalEndpoint;
    }
}