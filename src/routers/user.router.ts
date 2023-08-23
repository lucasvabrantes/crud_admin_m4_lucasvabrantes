import { Router } from "express";
import { verifyEmailExists } from "../middlewares/verifyEmailExists.middleware";
import { validateBody } from "../middlewares/validateBody.middleware";
import userController from "../controllers/user.controller";
import { userCreateSchema } from "../schemas/users.schemas";

export const userRouter: Router = Router();

userRouter.post(
    "",
    validateBody(userCreateSchema),
    verifyEmailExists,
    userController.create
);
