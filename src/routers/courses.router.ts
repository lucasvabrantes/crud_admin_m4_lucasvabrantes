import { Router } from "express";
import { courseCreateSchema } from "../schemas/courses.schemas";
import tokenExists from "../middlewares/tokenExists";
import verifyUserPermission from "../middlewares/verifyUserPermission.middleware";
import coursesController from "../controllers/courses.controller";
import validateBody from "../middlewares/validateBody.middleware";

export const coursesRouter: Router = Router();

coursesRouter.post(
    "",
    validateBody(courseCreateSchema),
    tokenExists,
    verifyUserPermission,
    coursesController.create
);

coursesRouter.get("", coursesController.readAllCourses);
coursesRouter.post(
    "/:courseId/users/:userId",
    tokenExists,
    verifyUserPermission,
    coursesController.enrollUser
);
