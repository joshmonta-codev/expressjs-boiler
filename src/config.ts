import dotenv from 'dotenv';

enum Environment {
    PRODUCTION = "production",
    STAGING = "staging",
    DEVELOPMENT = "development",
}

const CURRENT_ENVIRONMENT = Environment.DEVELOPMENT;

dotenv.config({
    path: `.env.${CURRENT_ENVIRONMENT}`
});

const env = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing: process.env['${name}'].`);
    }
    return value;
}

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export interface Config {
    port: number,
    mongo: {
        url: string
    }
    server: {
        port: number
    }
    smtp: {
        host: string,
        port: string,
        user: string,
        pass: string,
        secure: boolean
    }
}

export const config: Config = {
    port: +env("PORT"),
    mongo: {
        url: env("MONGO_URL")
    },
    server: {
        port: +env("SERVER_PORT")
    },
    smtp: {
        host: env("EMAIL_HOST"),
        port: env("EMAIL_PORT"),
        user: env("EMAIL_USER"),
        pass: env("EMAIL_PASS"),
        secure: Boolean(env("EMAIL_SECURE"))
    }
};
