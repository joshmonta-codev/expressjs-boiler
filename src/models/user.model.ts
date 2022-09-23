import { BaseModel } from "./base.model";
import { prop, getModelForClass, modelOptions, Severity, pre, DocumentType } from "@typegoose/typegoose";
import { nanoid } from 'nanoid';
import argon2 from "argon2";
import log from "../utils/logger.utils";

@pre<User>("save", async function () {
    if (!this.isModified("password")) { return; }
    const hash = await argon2.hash(this.password);
    this.password = hash
    return;
})
@modelOptions({
    schemaOptions: {
        timestamps: true
    },
    options: {
        allowMixed: Severity.ALLOW
    }
})
export class User extends BaseModel {
    @prop({ required: true, unique: true })
    email: string;

    @prop()
    firstName: string;

    @prop()
    lastName: string;

    @prop({ required: true })
    password: string;

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string;

    @prop()
    passwordResetCode: string | null;

    @prop({ default: false })
    verified: boolean;

    // tests the password against the hashed password
    async validatePassword(this: DocumentType<User>, candidatePass: string) {
        try {
            return await argon2.verify(this.password, candidatePass);
        } catch (e: any) {
            log.error(e, "Could not validate password.");
            return false;
        }
    }
}

export const UserModel = getModelForClass(User);