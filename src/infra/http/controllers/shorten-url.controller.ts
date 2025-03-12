import { z } from "zod";
import { ShortenUrlUseCase } from "../../../app/use-cases/shorten-url.use-case";
import { UserEntitiy } from "../../../domain/entities/user.entity";
import { Request, Response, NextFunction } from 'express';

interface ShortenUrlResponse {
    url: string
}

export class ShortenUrlController {
    constructor(private readonly shortenUrlUseCase: ShortenUrlUseCase) { }

    async handle(req: Request, res: Response<ShortenUrlResponse>, next: NextFunction): Promise<void> {
        try {
            const shortenUrlBodySchema = z.object({
                originalEndpoint: z.string().url()
            });
            const user = req.user as UserEntitiy | null;
            const { originalEndpoint } = shortenUrlBodySchema.parse(req.body);

            const url = await this.shortenUrlUseCase.execute({
                originalEndpoint,
                user
            });

            res.status(201).json({
                url: url
            });
        } catch (err) {
            next(err);
        }
    }
}