import "express-async-errors";
import express, { Application, json } from "express";
import handleErrors from "./middlewares/handleErrors.middleware";
import { sessionRouter } from "./routers/session.router";
import { userRouter } from "./routers/user.router";

const app: Application = express();
app.use(json());

app.use("/users", userRouter);
app.use("/login", sessionRouter);
// app.use("/courses");

app.use(handleErrors);

export default app;
