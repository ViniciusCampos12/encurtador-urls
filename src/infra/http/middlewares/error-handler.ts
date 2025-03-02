import { Request, Response, NextFunction } from "express";
import { ErrorManager } from "../../../app/errors/error-manager.error";

export function errorHandlerr(err: ErrorManager, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ErrorManager) {
    res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "fail",
    message: "Internal server error",
  });
}