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

export default userRouter;