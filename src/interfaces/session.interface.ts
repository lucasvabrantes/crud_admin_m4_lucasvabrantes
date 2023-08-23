import { z } from "zod";
import { sessionCreateSchema } from "../schemas/session.schemas";

export type SessionCreate = z.infer<typeof sessionCreateSchema>;
export type SessionReturn = { token: string };
