import { ShortnedUrlNotFound } from "../../../app/errors/shortned-url-not-found.error.js";
import { CompactUrlUseCase } from "../../../app/use-cases/compact-url.use-case.js";

export class CompactUrlController {
    constructor(private readonly compactUrlUseCase: CompactUrlUseCase) { }

    async handle(shortCode: string): Promise<string> {
        try {
            const url = await this.compactUrlUseCase.execute(shortCode);
            return url;
        } catch (err) {
            if (err instanceof ShortnedUrlNotFound) {
                throw err;
            }
            throw new Error(err.message);
        }
    }
}