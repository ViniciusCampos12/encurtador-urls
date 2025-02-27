import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export const validationMiddleware = (type: any) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const object = plainToInstance(type, req.body);
        const errors = await validate(object);

        if (errors.length > 0) {
            res.status(400).json({ errors: errors.map((error) => error.constraints) });
            return;
        }

        next();
    };
};