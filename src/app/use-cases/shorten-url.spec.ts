import { ShortenUrlUseCase } from './shorten-url.use-case';
import { InMemoryShortnedUrlRepository } from './../../../test/repositories/in-memory-shortned-url.repository';
import { ShortnedUrlEntitiy } from '../../domain/entities/shortned-url.entity';
import { ShortenUrlShortCodeExistsError } from '../errors/shorten-url-short-code-exists.error';

describe("shorten url", () => {
    let shortnedUrlRepository: InMemoryShortnedUrlRepository;
    let shortenUrlUseCase: ShortenUrlUseCase;

    beforeEach(async () => {
        shortnedUrlRepository = new InMemoryShortnedUrlRepository();
        shortenUrlUseCase = new ShortenUrlUseCase(shortnedUrlRepository);
        process.env.APP_URL = "http://test:3333"
    });

    it("should be able to generate a new shortened URL", async () => {
        const shortenUrlParams = {
            originalEndpoint: "https://x.com",
            user: null,
        };
        const shortnedEndpoint = await shortenUrlUseCase.execute(shortenUrlParams);

        expect(shortnedUrlRepository.shortnedUrls).toHaveLength(1);
        expect(shortnedEndpoint).toEqual(
            expect.any(String)
        );
    });

    it("should not be able to generate a new shortened URL if the shortCode already exists", async () => {
        const shortenUrlParams = {
            originalEndpoint: "https://x.com",
            user: null,
        };

        jest.spyOn(shortnedUrlRepository, "findByShortCode").mockResolvedValue(new ShortnedUrlEntitiy({
            originalEndpoint: "https://x.com",
            shortnedEndpoint: "http://test:3333/abcdefg",
            shortCode: "abcdef",
            clicks: 0,
            userId: undefined
        }));
        
        await expect(shortenUrlUseCase.execute(shortenUrlParams))
            .rejects
            .toThrow(ShortenUrlShortCodeExistsError)
    });
});