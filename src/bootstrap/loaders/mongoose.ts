import mongoose, { Mongoose, CallbackWithoutResult } from "mongoose";

import { config } from '../../config';

process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
});


export default async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongo.url, {
            retryWrites: true,
            w: 'majority'
        });
        console.log("Connected to mongoDB!");
    } catch (error) {
        console.error(`ERROR: ${error}`);
    }
}

