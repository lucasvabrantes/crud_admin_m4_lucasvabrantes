import { Request, Response } from "express";
import { UserReturn } from "../interfaces/user.interface";
import usersServices from "../services/users.services";

const create = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await usersServices.create(req.body);
    return res.status(201).json(user);
};

const login = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json();
};

const readAll = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json();
};

const userCourses = async (req: Request, res: Response): Promise<Response> => {
    return res.status(200).json();
};

export default { create, login, readAll, userCourses };
