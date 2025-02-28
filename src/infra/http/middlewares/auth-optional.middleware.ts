import { UserRepository } from './../../database/prisma/repositories/user.repository.js';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export async function authOptionalMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        req.user = null;
        return next();
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = await verifyToken(token);
        const userRepository = new UserRepository();
        const user = await userRepository.findById(decoded.sub);

        if (!user) {
            res.status(401).json({ message: "unauthorized" });
            return;
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "unauthorized" });
    }
}

function verifyToken(token: string): Promise<any> {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
            if (err) reject(new Error("Token invalid!"));
            else resolve(decoded);
        });
    });
}
