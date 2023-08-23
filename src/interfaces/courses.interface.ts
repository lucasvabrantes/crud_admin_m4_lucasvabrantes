import { QueryResult } from "pg";
import {
    allCoursesSchema,
    courseCreateSchema,
    courseSchema,
} from "../schemas/courses.schemas";
import { z } from "zod";

export type Course = z.infer<typeof courseSchema>;
export type CourseCreate = z.infer<typeof courseCreateSchema>;
export type CourseReadAll = z.infer<typeof allCoursesSchema>;
export type CourseResult = QueryResult<Course>;
