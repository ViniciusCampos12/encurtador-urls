import { CompactUrlUseCase } from "../../../app/use-cases/compact-url.use-case";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

interface CompactUrlResponse {
    url: string
}

export class CompactUrlController {
    constructor(private readonly compactUrlUseCase: CompactUrlUseCase) { }

    async handle(req: Request, res: Response<CompactUrlResponse>, next: NextFunction): Promise<void> {
        try {
            const compactUrlSchema = z.object({
                shortCode: z.string().length(6)
            })
            const { shortCode } = compactUrlSchema.parse(req.params);

            const url = await this.compactUrlUseCase.execute(shortCode);

            res.redirect(url);
        } catch (err) {
            next(err);
        }
    }
}