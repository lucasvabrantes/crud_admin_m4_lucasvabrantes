import { Router } from "express";
import { sessionCreateSchema } from "../schemas/session.schemas";
import { validateBody } from "../middlewares/validateBody.middleware";
import sessionController from "../controllers/session.controller";

export const sessionRouter: Router = Router();

sessionRouter.post(
    "",
    validateBody(sessionCreateSchema),
    sessionController.create
);
