import { UserLoginUseCase } from "../../../app/use-cases/user-login.use-case";
import { NextFunction, Request, Response } from "express";
import { z } from 'zod';

interface UserLoginResponse {
    jwt: string;
}

export class UserLoginController {
    constructor(private readonly userLoginUseCase: UserLoginUseCase) { }

    async handle(req: Request, res: Response<UserLoginResponse>, next: NextFunction): Promise<void> {
        try {
            const userLoginSchema = z.object({
                email: z.string().email(),
                password: z.string().min(8).max(24)
            })
            const { email, password } = userLoginSchema.parse(req.body);

            const token = await this.userLoginUseCase.execute({
                email,
                password
            })
            
            res.status(200).json({
                jwt: token
            });
        } catch (err) {
            next(err);
        }
    }
}