import { plugin, defaultClasses, DocumentType } from '@typegoose/typegoose';
import mongoose, { mongo } from 'mongoose';

export class BaseModel {

    // reverts transaction when error occurs
    static async withTransaction(
        fn: (session?: mongoose.ClientSession) => Promise<any>,
        existingSession?: mongoose.ClientSession
    ): Promise<any> {
        if (existingSession) {
            if (existingSession.inTransaction()) return fn(existingSession);
            return existingSession.withTransaction(fn);
        }
        const session = await mongoose.startSession();
        try {
            await session.withTransaction(fn);
        } finally {
            session.endSession();
        }
    }
}