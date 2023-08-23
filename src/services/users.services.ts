import { hash } from "bcryptjs";
import {
    UserCreate,
    UserResult,
    UserReturn,
    UserReadAll,
} from "../interfaces/user.interface";
import format from "pg-format";
import { client } from "../database";
import { userReadSchema, userReturnSchema } from "../schemas/users.schemas";

const create = async (payload: UserCreate): Promise<UserReturn> => {
    payload.password = await hash(payload.password, 10);

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

const readUserCourses = async (): Promise<UserReadAll> => {
    const query: UserResult = await client.query(`SELECT * FROM "users";`);
    return userReadSchema.parse(query.rows);
};

export default { create, readALl, readUserCourses };
