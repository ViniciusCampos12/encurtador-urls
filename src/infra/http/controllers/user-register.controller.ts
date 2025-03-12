import { UserRegisterUseCase } from "../../../app/use-cases/user-register.use-case";
import { NextFunction, Request, Response } from "express";
import { z } from 'zod';

export class UserRegisterController {
    constructor(private readonly userRegisterUseCase: UserRegisterUseCase) { }

    async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userSchema = z.object({
                name: z.string().min(6).max(191),
                password: z.string().min(8).max(24),
                email: z.string().email()
            })
            const { name, password, email } = userSchema.parse(req.body);

            await this.userRegisterUseCase.execute({
                name,
                password,
                email
            });

            res.status(201).json({
                status: "successfully registered."
            });
        } catch (err) {
            next(err);
        }
    }
}