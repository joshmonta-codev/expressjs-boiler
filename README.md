# expressjs-boiler
# Base On ExpressJS Boilerplate
#### Technologies used

- NodeJS and TypeScript
- Express JS with Zod Schema Validation
- MongoDB Database integrated with Mongoose/TypeGoose
- Jest for testing
- Docker (Not mandatory)

## Folder structure

#### Overview

```
.
├── src                        # Where your source code lives
│   ├── bootstrap              # Initialization and loading of the API dependencies (Express, Database, ...)
│   ├── controllers            # This is where you call functions from the service layer.
│   ├── middlewares            # Code that gaps between other applications, tools, and databases in order to provide unified services to users
|   ├── models                 # Used to generate typing and ORM models
|   ├── routes                 # Where you define url routes of API endpoints
|   ├── schemas                # Schema validations for database models
|   ├── services               # Business logic and where the app talks to the database layer
|   ├── shared                 # Shared interfaces, enums, and DTO models
│   ├── tests                  # Where all our testing strategy lives
│   ├── utils                  # Collection of utils function that we use in the project
│   ├── config.ts              # Config of the app, sourced by environment variables
│   └── index.ts               # Entry point of the API
│
├── .dockerignore              # Defined files and folders that docker ignores
├── jest-mongodb-config.js     # Optional if you don't use MongoDB!
├── jest.config.js             # Jest configuration
├── Dockerfile                 # Docker image configuration (Optional !)
├── .env.development           # Example of what your .env file should look like
├── .gitignore                 # Standard gitignore file
├── package.json               # Node module dependencies
├── README.md                  # Simple readme file
└── tsconfig.json              # TypeScript compiler options
```

## How to use

- Duplicate the .env.example file and rename it .env.development
- Run npm install

#### Start mongoDB with docker-compose

- Make sure you have docker installed on your machine
- Run `docker-compose build`
- Run `docker-compose up` to start the containers
- Run `docker-compose down` to remove the running containers

This will spin up a mongoDB instance locally, you can also add in the future other stuff like redis, elastic search ...
If using docker doesn't appeal you, feel free to install mondoDB manually or to use a service like mongoDB Atlas instead.

#### Start server for development

- Run `npm run build` then `npm run dev`
