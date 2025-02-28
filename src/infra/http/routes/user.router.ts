import { validationMiddleware } from './../middlewares/validator.middleware.js';
import { UserRepository } from './../../database/prisma/repositories/user.repository.js';
import { UserRegisterUseCase } from '../../../app/use-cases/user-register.use-case.js';
import { UserRegisterController } from './../controllers/user-register.controller.js';
import { Request, Response, NextFunction, Router, } from "express";
import { UserRegisterDto } from '../dtos/user-register.dto.js';
import { UserLoginDto } from '../dtos/user-login.dto.js';
import { UserLoginController } from '../controllers/user-login.controller.js';
import { UserLoginUseCase } from '../../../app/use-cases/user-login.use-case.js';

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

export default userRouter;