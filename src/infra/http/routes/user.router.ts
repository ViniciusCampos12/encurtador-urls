import { UserShortnedUrlDeleteUseCase } from './../../../app/use-cases/user-shortned-url-delete.use-case';
import { UserShortnedUrlsListController } from './../controllers/user-shortned-urls-list.controller';
import { UserRepository } from './../../database/prisma/repositories/user.repository';
import { UserRegisterUseCase } from '../../../app/use-cases/user-register.use-case';
import { UserRegisterController } from './../controllers/user-register.controller';
import { Router } from "express";
import { UserLoginController } from '../controllers/user-login.controller';
import { UserLoginUseCase } from '../../../app/use-cases/user-login.use-case';
import { authMiddleware } from '../middlewares/auth.middleware';
import { UserShortnedUrlsListUseCase } from '../../../app/use-cases/user-shortned-urls-list.use-case';
import { ShortnedUrlRepository } from '../../database/prisma/repositories/shortned-url.repository';
import { UserShortnedUrlDeleteController } from '../controllers/user-shortned-url-delete.controller';
import { UserShortnedUrlEditUseCase } from '../../../app/use-cases/user-shortned-url-edit.use-case';
import { UserShortnedUrlEditController } from '../controllers/user-shortned-url-edit.controller';

const userRepository = new UserRepository();
const userRegisterUseCase = new UserRegisterUseCase(userRepository);
const userLoginUseCase = new UserLoginUseCase(userRepository);
const shortnedUrlRepository = new ShortnedUrlRepository();
const userShortnedUrlsListUseCase = new UserShortnedUrlsListUseCase(shortnedUrlRepository);
const userShortnedUrlDeleteUseCase = new UserShortnedUrlDeleteUseCase(shortnedUrlRepository);
const userShortnedUrlEditUseCase = new UserShortnedUrlEditUseCase(shortnedUrlRepository);

const userRegisterController = new UserRegisterController(userRegisterUseCase);
const userLoginController = new UserLoginController(userLoginUseCase);
const userShortnedUrlsListController = new UserShortnedUrlsListController(userShortnedUrlsListUseCase);
const userShortnedUrlDeleteController = new UserShortnedUrlDeleteController(userShortnedUrlDeleteUseCase);
const userShortnedUrlEditController = new UserShortnedUrlEditController(userShortnedUrlEditUseCase);

const userRouter = Router();

userRouter.get("/shortned-urls/list", authMiddleware, async (req, res, next) => userShortnedUrlsListController.handle(req, res, next));

userRouter.post("/register", async (req, res, next) => userRegisterController.handle(req, res, next));
userRouter.post("/login", async (req, res, next) => userLoginController.handle(req, res, next));

userRouter.put("/shortned-urls/:id/edit", authMiddleware, async (req, res, next) => userShortnedUrlEditController.handle(req, res, next));

userRouter.delete("/shortned-urls/:id/delete", authMiddleware, async (req, res, next) => userShortnedUrlDeleteController.handle(req, res, next));

export default userRouter;