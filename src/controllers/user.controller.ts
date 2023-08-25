import { Request, Response } from "express";
import { UserReturn } from "../interfaces/user.interface";
import usersServices from "../services/users.services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await usersServices.create(req.body);
    return res.status(201).json(user);
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
    const allUsers = await usersServices.readALl();
    return res.status(200).json(allUsers);
};

const readUserCourses = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const userCourses: any = await usersServices.readUserCourses(req.params.id);
    return res.status(200).json(userCourses);
};

export default { create, readAll, readUserCourses };
