import { User, UserModel } from "../models/user.model";
import { sendEmail } from "../utils/mailer.utils";

export function createUser(input: Partial<User>) {
    return UserModel.create(input)
}