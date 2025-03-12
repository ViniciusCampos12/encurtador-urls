import { Router } from "express";
import { ShortnedUrlRepository } from "../../database/prisma/repositories/shortned-url.repository";
import { ShortenUrlUseCase } from "../../../app/use-cases/shorten-url.use-case";
import { ShortenUrlController } from "../controllers/shorten-url.controller";
import { authOptionalMiddleware } from "../middlewares/auth-optional.middleware";;

const shortnedUrlRouter = Router();
const shortnedUrlRepository = new ShortnedUrlRepository();
const shortenUrlUseCase = new ShortenUrlUseCase(shortnedUrlRepository);
const shortenUrlController = new ShortenUrlController(shortenUrlUseCase);

shortnedUrlRouter.post("/shorten", authOptionalMiddleware, async (req, res, next) => shortenUrlController.handle(req, res, next));

export default shortnedUrlRouter;