import { UserShortnedUrlsListUseCase } from './user-shortned-urls-list.use-case';
import { InMemoryShortnedUrlRepository } from './../../../test/repositories/in-memory-shortned-url.repository';
import { ShortnedUrlEntitiy } from '../../domain/entities/shortned-url.entity';
import { randomUUID } from 'crypto';

describe("user shortned urls list", () => {
    let shortnedUrlsRepository: InMemoryShortnedUrlRepository;
    let userShortnedUrlsListUseCase: UserShortnedUrlsListUseCase

    beforeEach(() => {
        shortnedUrlsRepository = new InMemoryShortnedUrlRepository();
        userShortnedUrlsListUseCase = new UserShortnedUrlsListUseCase(shortnedUrlsRepository);
    });

    it("should be able to return a list of the user's shortened URLs", async () => {
        const userId = randomUUID();
        
        for (let i = 0; i < 3; i++) {
            const shortCode = ShortnedUrlEntitiy.generateShortCode();
            const shortnedUrlEntitiy = new ShortnedUrlEntitiy({
                originalEndpoint: "https://x.com",
                shortnedEndpoint: "htttp://test:3333/" + shortCode,
                shortCode: shortCode,
                clicks: 0,
                userId,
            })

            await shortnedUrlsRepository.create(shortnedUrlEntitiy);
        }

        const userShortnedUrlsList = await userShortnedUrlsListUseCase.execute(userId);

        expect(shortnedUrlsRepository.shortnedUrls).toHaveLength(3);
        expect(userShortnedUrlsList).toHaveLength(3);
        userShortnedUrlsList.forEach(item => {
            expect(item).toBeInstanceOf(ShortnedUrlEntitiy);
        });
    });

    it("should not be able to return a list of the user's shortened URLs if it doesn't exist", async () => {
        const userId = randomUUID();
        const userShortnedUrlsList = await userShortnedUrlsListUseCase.execute(userId);

        expect(shortnedUrlsRepository.shortnedUrls).toHaveLength(0);
        expect(userShortnedUrlsList).toHaveLength(0);
    });
});