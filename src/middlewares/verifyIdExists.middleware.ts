import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import { client } from "../database";
import AppError from "../errors/AppError";

export const verifyIdExists = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const { userId } = req.params;
    const { courseId } = req.params;

    const queryUserIdResult: QueryResult = await client.query(
        'SELECT * FROM "users" WHERE "id" = $1;',
        [userId]
    );

    const queryCourseIdResult: QueryResult = await client.query(
        'SELECT * FROM "courses" WHERE "id" = $1;',
        [courseId]
    );

    const queriesResult =
        !queryUserIdResult.rowCount || !queryCourseIdResult.rowCount;

    if (queriesResult) {
        throw new AppError("User/course not found", 404);
    }

    return next();
};

export default { verifyIdExists };
