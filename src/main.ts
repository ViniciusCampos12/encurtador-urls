import express, { Router } from "express";
import { errorHandler } from "./infra/http/middlewares/error-handler";
import userRouter from "./infra/http/routes/user.router";
import shortnedUrlRouter from "./infra/http/routes/shorted-url.router";
import compactUrlRouter from "./infra/http/routes/compact-url.router";

export const app = express();
const port = 3333;
const apiRouter = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

apiRouter.use("/users", userRouter);
apiRouter.use("/shortned-urls", shortnedUrlRouter);

app.use("/api", apiRouter);
app.use("/", compactUrlRouter);

app.use(errorHandler);

app.listen(port);