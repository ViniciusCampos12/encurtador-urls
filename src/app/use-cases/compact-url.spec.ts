import { ShortenUrlUseCase } from './shorten-url.use-case';
import { CompactUrlUseCase } from './compact-url.use-case';
import { InMemoryShortnedUrlRepository } from './../../../test/repositories/in-memory-shortned-url.repository';
import { ShortnedUrlNotFound } from '../errors/shortned-url-not-found.error';

describe("compact url", () => {
    let shortnedUrlRepository: InMemoryShortnedUrlRepository;
    let compactUrlUseCase: CompactUrlUseCase;

    beforeEach(async () => {
        shortnedUrlRepository = new InMemoryShortnedUrlRepository();
        compactUrlUseCase = new CompactUrlUseCase(shortnedUrlRepository);
    });

    it("should be able to access a compact url", async () => {
        process.env.APP_URL = "http://test:3333"
        const shortenUrlUseCase = new ShortenUrlUseCase(shortnedUrlRepository);
        const shortenUrlParams = {
            originalEndpoint: "https://x.com",
            user: null,
        };
        const shortnedEndpoint = await shortenUrlUseCase.execute(shortenUrlParams);
        
        const shortCode = shortnedEndpoint.slice(-6);
        const originalEndpoint = await compactUrlUseCase.execute(shortCode);

        expect(shortnedUrlRepository.shortnedUrls[0].clicks).toEqual(1);
        expect(originalEndpoint).toEqual(
            expect.any(String)
        )
    });


    it("should not be able to access a compact URL if the shortCode doesn't exist", async () => {
        const shortCode = "abcdef";
        await expect(compactUrlUseCase.execute(shortCode))
            .rejects
            .toThrow(ShortnedUrlNotFound)
    });
})