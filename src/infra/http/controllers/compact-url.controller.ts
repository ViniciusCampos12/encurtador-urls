import { ShortnedUrlNotFound } from "../../../app/errors/shortned-url-not-found.error.js";
import { CompactUrlUseCase } from "../../../app/use-cases/compact-url.use-case.js";

interface CompactUrlResponse {
    url: string
}

export class CompactUrlController {
    constructor(private readonly compactUrlUseCase: CompactUrlUseCase) { }

    async handle(shortCode: string): Promise<CompactUrlResponse> {
        try {
            const url = await this.compactUrlUseCase.execute(shortCode);
            return { url };
        } catch (err) {
            if (err instanceof ShortnedUrlNotFound) {
                throw err;
            }
            throw new Error(err.message);
        }
    }
}