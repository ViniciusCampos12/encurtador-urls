import { randomUUID } from 'crypto';
import { InMemoryShortnedUrlRepository } from './../../../test/repositories/in-memory-shortned-url.repository';
import { UserShortnedUrlEditUseCase } from './user-shortned-url-edit.use-case';
import { ShortnedUrlEntitiy } from '../../domain/entities/shortned-url.entity';
import { ShortnedUrlNotFound } from '../errors/shortned-url-not-found.error';

describe("user shortned url edit", () => {
    let shortnedUrlsRepository: InMemoryShortnedUrlRepository;
    let userShortnedUrlEditUseCase: UserShortnedUrlEditUseCase

    beforeEach(() => {
        shortnedUrlsRepository = new InMemoryShortnedUrlRepository();
        userShortnedUrlEditUseCase = new UserShortnedUrlEditUseCase(shortnedUrlsRepository);
    });

    it("should be able to edit a user's shortned url", async () => {
        const userId = randomUUID();
        const shortCode = ShortnedUrlEntitiy.generateShortCode();
        const originalEndpoitOld = "https://x.com";
        const originalEndpoitLater = "https://google.com";

        const shortnedUrlEntitiy = new ShortnedUrlEntitiy({
            originalEndpoint: originalEndpoitOld,
            shortnedEndpoint: "htttp://test:3333/" + shortCode,
            shortCode,
            clicks: 0,
            userId: userId,
        })

        await shortnedUrlsRepository.create(shortnedUrlEntitiy);
        const shortnedUrl = await shortnedUrlsRepository.findByShortCode(shortCode);

        const userShortnedUrlEditParams = {
            userId,
            id: shortnedUrl!.id as string,
            originalEndpoint: originalEndpoitLater
        };
        await userShortnedUrlEditUseCase.execute(userShortnedUrlEditParams);

        expect(shortnedUrlsRepository.shortnedUrls[0].originalEndpoint).toBe(originalEndpoitLater);
    });

    it("should not be able to edit a user's shortened URL if it doesn't exist", async () => {
        const userShortnedUrlEditParams = {
            userId: randomUUID(),
            id: randomUUID(),
            originalEndpoint: "https://x.com"
        };

        await expect(userShortnedUrlEditUseCase.execute(userShortnedUrlEditParams))
            .rejects
            .toThrow(ShortnedUrlNotFound);
    })
});