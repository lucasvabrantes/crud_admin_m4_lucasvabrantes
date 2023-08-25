import {
    Course,
    CourseCreate,
    CourseReadAll,
    CourseResult,
} from "../interfaces/courses.interface";
import { client } from "../database";
import { allCoursesSchema, courseSchema } from "../schemas/courses.schemas";
import format from "pg-format";
import { QueryResult } from "pg";

const create = async (payload: CourseCreate): Promise<Course> => {
    const query = format(
        `INSERT INTO "courses" (%I) 
        VALUES (%L) RETURNING *;`,
        Object.keys(payload),
        Object.values(payload)
    );

    const queryString = await client.query(query);
    return courseSchema.parse(queryString.rows[0]);
};

const reaAllCourses = async (): Promise<CourseReadAll> => {
    const queryString: string = `SELECT * FROM "courses";`;
    const query: CourseResult = await client.query(queryString);

    return allCoursesSchema.parse(query.rows);
};

const enrollUser = async (courseId: string, userId: string): Promise<void> => {
    await client.query(
        `INSERT INTO "userCourses" ("courseId","userId") VALUES ($1, $2);`,
        [courseId, userId]
    );

    return;
};

const destroyCourse = async (
    courseId: string,
    userId: string
): Promise<void> => {
    const queryString: string = `UPDATE "userCourses" SET "active" = 
    false  WHERE "courseId" = $1 AND "userId" = $2 ;`;
    await client.query(queryString, [courseId, userId]);
};

const readUsersByCourse = async (courseId: string): Promise<void> => {
    const query: string = `SELECT 
    "u"."id" AS "userId",
    "u"."name" AS "userName",
    "c"."id" AS "courseId",
    "c"."name" AS "courseName",
    "c"."description"AS "courseDescription",
    "uc"."active" AS "userActiveInCourse"
        FROM "courses" AS "c"
        JOIN "userCourses" AS "uc"
            ON "uc"."courseId" = "c"."id"
        JOIN "users" AS "u"
            ON "u"."id" = "uc"."userId"
        WHERE "c"."id" = $1;`;

    const queryResult: QueryResult = await client.query(query, [courseId]);
    const usersList: any = queryResult.rows;

    return usersList;
};

export default {
    create,
    reaAllCourses,
    enrollUser,
    destroyCourse,
    readUsersByCourse,
};
