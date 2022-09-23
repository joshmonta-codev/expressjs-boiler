import express, { Application } from "express";
import router from "../../routes"
import cors from "cors";
import helmet from "helmet";
import { config } from "../../config";

export default async (app: Application) => {
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(router);
}