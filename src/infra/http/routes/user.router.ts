import { validationMiddleware } from './../middlewares/validator.middleware.js';
import { UserRepository } from './../../database/prisma/repositories/user.repository.js';
import { UserRegisterUseCase } from '../../../app/use-cases/user-register.use-case.js';
import { UserRegisterController } from './../controllers/user-register.controller.js';
import { Request, Response, NextFunction, Router, } from "express";
import { UserRegisterDto } from '../dtos/user-register.dto.js';

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

export default userRouter;