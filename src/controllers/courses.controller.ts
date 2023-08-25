import { Request, Response } from "express";
import { Course, CourseReadAll } from "../interfaces/courses.interface";
import coursesServices from "../services/courses.services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const course: Course = await coursesServices.create(req.body);
    return res.status(201).json(course);
};

const readAllCourses = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const courses: CourseReadAll = await coursesServices.reaAllCourses();
    return res.status(200).json(courses);
};

const enrollUser = async (req: Request, res: Response): Promise<Response> => {
    await coursesServices.enrollUser(req.params.courseId, req.params.userId);
    const message: string = "User successfully vinculed to course";

    return res.status(201).json({ message });
};

const destroyCourse = async (
    req: Request,
    res: Response
): Promise<Response> => {
    await coursesServices.destroyCourse(req.params.courseId, req.params.userId);
    return res.status(204).send();
};

const readUsersByCourse = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const usersByCourse = await coursesServices.readUsersByCourse(
        req.params.courseId
    );

    return res.status(200).json(usersByCourse);
};

export default {
    create,
    readAllCourses,
    enrollUser,
    destroyCourse,
    readUsersByCourse,
};
