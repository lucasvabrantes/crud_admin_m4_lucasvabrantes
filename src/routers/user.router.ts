import { Router } from "express";
import { verifyEmailExists } from "../middlewares/verifyEmailExists.middleware";
import userController from "../controllers/user.controller";
import { userCreateSchema } from "../schemas/users.schemas";
import tokenExists from "../middlewares/tokenExists";
import verifyUserPermission from "../middlewares/verifyUserPermission.middleware";
import validateBody from "../middlewares/validateBody.middleware";

export const userRouter: Router = Router();

userRouter.post(
    "",
    validateBody(userCreateSchema),
    verifyEmailExists,
    userController.create
);

userRouter.get("", tokenExists, verifyUserPermission, userController.readAll);
userRouter.get(
    "/:id/courses",
    tokenExists,
    verifyUserPermission,
    userController.readUserCourses
);
