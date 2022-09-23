import { Application } from "express";

// Loaders
import mongooseLoader from "./mongoose";
import expressLoader from "./express";

export default async (app: Application) => {
    await expressLoader(app);
    await mongooseLoader();
}