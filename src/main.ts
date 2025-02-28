import express, { Router } from "express";
import { errorHandlerr } from "./infra/http/middlewares/error-handler.js";
import userRouter from "./infra/http/routes/user.router.js";
import shortnedUrlRouter from "./infra/http/routes/shorted-url.router.js";
import compactUrlRouter from "./infra/http/routes/compact-url.router.js";

export const app = express();
const port = 3333;
const apiRouter = Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandlerr);

apiRouter.use("/users", userRouter);
apiRouter.use("/shortned-urls", shortnedUrlRouter);

app.use("/api", apiRouter);
app.use("/", compactUrlRouter);

app.listen(port, () => {
    console.log('start!')
});