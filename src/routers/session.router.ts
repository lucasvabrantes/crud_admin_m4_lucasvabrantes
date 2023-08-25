import { Router } from "express";
import { sessionCreateSchema } from "../schemas/session.schemas";
import sessionController from "../controllers/session.controller";
import validateBody from "../middlewares/validateBody.middleware";

export const sessionRouter: Router = Router();

sessionRouter.post(
    "",
    validateBody(sessionCreateSchema),
    sessionController.create
);
