import { UserShortnedUrlDeleteUseCase } from './user-shortned-url-delete.use-case';
import { InMemoryShortnedUrlRepository } from './../../../test/repositories/in-memory-shortned-url.repository';
import { ShortnedUrlEntitiy } from '../../domain/entities/shortned-url.entity';
import { randomUUID } from 'crypto';
import { ShortnedUrlNotFound } from '../errors/shortned-url-not-found.error';

describe("user shortned url delete", () => {
    let shortnedUrlsRepository: InMemoryShortnedUrlRepository;
    let userShortnedUrlDeleteUseCase: UserShortnedUrlDeleteUseCase;

    beforeEach(() => {
        shortnedUrlsRepository = new InMemoryShortnedUrlRepository();
        userShortnedUrlDeleteUseCase = new UserShortnedUrlDeleteUseCase(shortnedUrlsRepository);
    });

    it("should be able to delete user's shortened URL", async () => {
        const userId = randomUUID();
        const shortCode = ShortnedUrlEntitiy.generateShortCode();

        const shortnedUrlEntitiy = new ShortnedUrlEntitiy({
            originalEndpoint: "https://x.com",
            shortnedEndpoint: "htttp://test:3333/" + shortCode,
            shortCode,
            clicks: 0,
            userId: userId,
        })

        await shortnedUrlsRepository.create(shortnedUrlEntitiy);
        const shortnedUrl = await shortnedUrlsRepository.findByShortCode(shortCode);

        await userShortnedUrlDeleteUseCase.execute({
            userId,
            id: shortnedUrl!.id as string,
        });

        expect(shortnedUrlsRepository.shortnedUrls[0].deletedAt).toEqual(
            expect.any(Date)
        );
    });

    it("should not be able to delete a user's shortened URL if it doesn't exist", async () => {
        const deleteUserParams = {
            userId: randomUUID(),
            id: randomUUID()
        };

        await expect(userShortnedUrlDeleteUseCase.execute(deleteUserParams))
            .rejects
            .toThrow(ShortnedUrlNotFound);
    })
});