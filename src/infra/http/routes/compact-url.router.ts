import { CompactUrlUseCase } from './../../../app/use-cases/compact-url.use-case.js';
import { Router, Request, Response, NextFunction } from "express";
import { ShortnedUrlRepository } from "../../database/prisma/repositories/shortned-url.repository.js";
import { CompactUrlController } from '../controllers/compact-url.controller.js';

const compactUrlRouter = Router();
const shortnedUrlRepository = new ShortnedUrlRepository();
const compactUrlUseCase = new CompactUrlUseCase(shortnedUrlRepository);
const compactUrlController = new CompactUrlController(compactUrlUseCase);

compactUrlRouter.get("/:shortCode",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const shortCode = req.params.shortCode;
            const { url } = await compactUrlController.handle(shortCode);
            return res.redirect(url);
        } catch (err) {
            next(err);
        }
    }
)

export default compactUrlRouter;