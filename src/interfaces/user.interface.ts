import { z } from "zod";
import {
    userCreateSchema,
    userSchema,
    userReadSchema,
    userReturnSchema,
} from "../schemas/users.schemas";
import { QueryResult } from "pg";

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserReturn = z.infer<typeof userReturnSchema>;
export type UserReadAll = z.infer<typeof userReadSchema>;
export type UserResult = QueryResult<User>;
