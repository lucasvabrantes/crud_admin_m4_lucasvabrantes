import { Router } from "express";
import { courseCreateSchema } from "../schemas/courses.schemas";
import tokenExists from "../middlewares/tokenExists";
import verifyUserPermission from "../middlewares/verifyUserPermission.middleware";
import coursesController from "../controllers/courses.controller";
import validateBody from "../middlewares/validateBody.middleware";
import { verifyIdExists } from "../middlewares/verifyIdExists.middleware";
import coursesServices from "../services/courses.services";
import { verifyIfIsAdmin } from "../middlewares/verifyIfIsAdmin.middleware";

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
    verifyIdExists,
    tokenExists,
    verifyUserPermission,
    coursesController.enrollUser
);

coursesRouter.delete(
    "/:courseId/users/:userId",
    verifyIdExists,
    tokenExists,
    verifyUserPermission,
    coursesController.destroyCourse
);

coursesRouter.get(
    "/:courseId/users",
    tokenExists,
    verifyIfIsAdmin,
    coursesController.readUsersByCourse
);
