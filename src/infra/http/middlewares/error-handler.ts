import { Request, Response, NextFunction } from "express";
import { ErrorManager } from "../../../app/errors/error-manager.error";
import { ZodError } from "zod";
import { HttpEnum } from "../../../app/enums/http.enum";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof ErrorManager) {
    res.status(err.statusCode).json({
      status: "fail",
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(HttpEnum.BAD_REQUEST).json({
      status: "invalid",
      message: err.errors.map(item => {
        return {
          message: item.message,
          path: item.path
        }
      }),
    });
    return;
  }


  res.status(500).json({
    status: "fail",
    message: "Internal server error",
  });
}