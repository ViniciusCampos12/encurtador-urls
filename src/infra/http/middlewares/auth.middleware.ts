import { UserRepository } from './../../database/prisma/repositories/user.repository.js';
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token not found!" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Token invalid!" });
        }

        if (decoded && typeof decoded.sub === "string") {
            const userRepository = new UserRepository();
            userRepository.findById(decoded.sub).then(user => {
                if (!user) {
                    return res.status(401).json({ message: "unauthorized" });
                }

                req.user = user;
            }
            );
        }

        next();
    });
}