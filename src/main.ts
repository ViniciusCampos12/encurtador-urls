import express, { Router } from "express";
import { errorHandlerr } from "./infra/http/middlewares/error-handler.js";
import userRouter from "./infra/http/routes/user.router.js";

export const app = express();
const port = 3333;
const apiRouter = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlerr);

apiRouter.use("/users", userRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
    console.log('start!')
});