import { CompactUrlUseCase } from './../../../app/use-cases/compact-url.use-case';
import { Router } from "express";
import { ShortnedUrlRepository } from "../../database/prisma/repositories/shortned-url.repository";
import { CompactUrlController } from '../controllers/compact-url.controller';

const compactUrlRouter = Router();
const shortnedUrlRepository = new ShortnedUrlRepository();
const compactUrlUseCase = new CompactUrlUseCase(shortnedUrlRepository);
const compactUrlController = new CompactUrlController(compactUrlUseCase);

compactUrlRouter.get("/:shortCode", async (req, res, next) => compactUrlController.handle(req, res, next));

export default compactUrlRouter;