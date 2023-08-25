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

const enrollUser = async (courseId: string, userId: string): Promise<any> => {
    const query: QueryResult = await client.query(
        `INSERT INTO "userCourses" ("courseId","userId") VALUES ($1, $2) RETURNING *;`,
        [courseId, userId]
    );

    console.log(query);
};

export default { create, reaAllCourses, enrollUser };
