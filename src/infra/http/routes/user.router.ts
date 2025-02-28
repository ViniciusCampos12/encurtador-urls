import { UserShortnedUrlDeleteUseCase } from './../../../app/use-cases/user-shortned-url-delete.use-case.js';
import { UserShortnedUrlsListController } from './../controllers/user-shortned-urls-list.controller.js';
import { validationMiddleware } from './../middlewares/validator.middleware.js';
import { UserRepository } from './../../database/prisma/repositories/user.repository.js';
import { UserRegisterUseCase } from '../../../app/use-cases/user-register.use-case.js';
import { UserRegisterController } from './../controllers/user-register.controller.js';
import { Request, Response, NextFunction, Router, } from "express";
import { UserRegisterDto } from '../dtos/user-register.dto.js';
import { UserLoginDto } from '../dtos/user-login.dto.js';
import { UserLoginController } from '../controllers/user-login.controller.js';
import { UserLoginUseCase } from '../../../app/use-cases/user-login.use-case.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { UserShortnedUrlsListUseCase } from '../../../app/use-cases/user-shortned-urls-list.use-case.js';
import { ShortnedUrlRepository } from '../../database/prisma/repositories/shortned-url.repository.js';
import { UserEntitiy } from '../../../domain/entities/user.entity.js';
import { UserShortnedUrlDeleteController } from '../controllers/user-shortned-url-delete.controller.js';
import { UserShortnedUrlEditDto } from '../dtos/user-shortned-url-edit.dto.js';
import { UserShortnedUrlEditUseCase } from '../../../app/use-cases/user-shortned-url-edit.use-case.js';
import { UserShortnedUrlEditController } from '../controllers/user-shortned-url-edit.controller.js';

const userRouter = Router();
const userRepository = new UserRepository();
const userRegisterUseCase = new UserRegisterUseCase(userRepository);
const userRegisterController = new UserRegisterController(userRegisterUseCase);

userRouter.post("/register", validationMiddleware(UserRegisterDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, password, email } = req.body;

            await userRegisterController.handle({
                name, password, email
            });
            res.status(201).json({
                status: "successfully registered."
            });
        } catch (err) {
            next(err);
        }
    }
);

const userLoginUseCase = new UserLoginUseCase(userRepository);
const userLoginController = new UserLoginController(userLoginUseCase);

userRouter.post("/login", validationMiddleware(UserLoginDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const token = await userLoginController.handle({
                email, password
            });
            res.status(200).json(token);
        } catch (err) {
            next(err);
        }
    }
);

const shortnedUrlRepository = new ShortnedUrlRepository();
const userShortnedUrlsListUseCase = new UserShortnedUrlsListUseCase(shortnedUrlRepository)
const userShortnedUrlsListController = new UserShortnedUrlsListController(userShortnedUrlsListUseCase);

userRouter.get("/shortned-urls/list", authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as UserEntitiy;
            const userShortnedUrlsList = await userShortnedUrlsListController.handle(user);
            res.status(200).json({ "shortned-urls": userShortnedUrlsList });
        } catch (err) {
            next(err);
        }
    }
);

const userShortnedUrlDeleteUseCase = new UserShortnedUrlDeleteUseCase(shortnedUrlRepository);
const userShortnedUrlDeleteController = new UserShortnedUrlDeleteController(userShortnedUrlDeleteUseCase);

userRouter.delete("/shortned-urls/:id/delete", authMiddleware,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as UserEntitiy;
            const id = req.params.id;
            await userShortnedUrlDeleteController.handle(user, id);
            res.status(204).json();
        } catch (err) {
            next(err);
        }
    }
);

const userShortnedUrlEditUseCase = new UserShortnedUrlEditUseCase(shortnedUrlRepository);
const userShortnedUrlEditController = new UserShortnedUrlEditController(userShortnedUrlEditUseCase);

userRouter.put("/shortned-urls/:id/edit", authMiddleware, validationMiddleware(UserShortnedUrlEditDto),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user as UserEntitiy;
            const id = req.params.id;
            const originalEndpoint = req.body;
            await userShortnedUrlEditController.handle(user, id, originalEndpoint);
            res.status(200).json({ status: "successfully update." });
        } catch (err) {
            next(err);
        }
    }
);

export default userRouter;