import { hash, hashSync } from "bcryptjs";
import {
    UserCreate,
    UserResult,
    UserReturn,
    UserReadAll,
} from "../interfaces/user.interface";
import format from "pg-format";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas/users.schemas";
import AppError from "../errors/AppError";

const create = async (payload: UserCreate): Promise<UserReturn> => {
    payload.password = hashSync(payload.password, 10);

    const queryFormat: string = format(
        `
        INSERT INTO "users" (%I) VALUES (%L)
        RETURNING *;
        `,
        Object.keys(payload),
        Object.values(payload)
    );

    const query: UserResult = await client.query(queryFormat);
    return userReturnSchema.parse(query.rows[0]);
};

const readALl = async (): Promise<UserReadAll> => {
    const query: UserResult = await client.query(`SELECT * FROM "users";`);
    return userReadSchema.parse(query.rows);
};

const readUserCourses = async (userId: string): Promise<Array<object>> => {
    const queryString: UserResult = await client.query(
        `SELECT 
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description"AS "courseDescription",
    "uc"."active" AS "userActiveInCourse",
    "uc"."userId",
    "u"."name" AS "userName"
        FROM "users" AS "u"
        JOIN "userCourses" AS "uc"
            ON "uc"."userId" = "u"."id"
        JOIN "courses" AS "c"
            ON "c"."id" = "uc"."courseId"
        WHERE "u"."id" = $1;`,
        [userId]
    );

    if (!queryString) {
        throw new AppError("User/course not found", 404);
    }

    if (!queryString.rowCount) {
        throw new AppError("No course found", 404);
    }

    return queryString.rows;
};

export default { create, readALl, readUserCourses };
