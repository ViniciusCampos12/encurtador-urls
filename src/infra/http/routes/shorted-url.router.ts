import { Router, Request, Response, NextFunction } from "express";
import { validationMiddleware } from "../middlewares/validator.middleware";
import { ShortenUrlDto } from "../dtos/shorten-url.dto";
import { ShortnedUrlRepository } from "../../database/prisma/repositories/shortned-url.repository";
import { ShortenUrlUseCase } from "../../../app/use-cases/shorten-url.use-case";
import { ShortenUrlController } from "../controllers/shorten-url.controller";
import { authOptionalMiddleware } from "../middlewares/auth-optional.middleware";
import { UserEntitiy } from "../../../domain/entities/user.entity";

const shortnedUrlRouter = Router();
const shortnedUrlRepository = new ShortnedUrlRepository();
const shortenUrlUseCase = new ShortenUrlUseCase(shortnedUrlRepository);
const shortenUrlController = new ShortenUrlController(shortenUrlUseCase);

shortnedUrlRouter.post("/shorten", authOptionalMiddleware, validationMiddleware(ShortenUrlDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { originalEndpoint } = req.body;
            const user = req.user as UserEntitiy | null;
            const url = await shortenUrlController.handle({
                originalEndpoint
            }, user);
            res.status(201).json(url);
        } catch (err) {
            next(err);
        }
    }
);

export default shortnedUrlRouter;