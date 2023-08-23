import { userSchema } from "./users.schemas";

const sessionCreateSchema = userSchema.pick({
    email: true,
    password: true,
});

export { sessionCreateSchema };
