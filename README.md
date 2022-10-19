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
- Run `docker build -t myapp:v1 .`
- Run `docker run --name myapp_c -p 4000:4000 --rm myapp:v1` to start the containers
- Run `docker-compose down` to remove the running containers

This will spin up a mongoDB instance locally, you can also add in the future other stuff like redis, elastic search ...
If using docker doesn't appeal you, feel free to install mondoDB manually or to use a service like mongoDB Atlas instead.

#### Start server for development

- Run `npm run build` then `npm run dev`


## Deploy Docker image project to Kubernetes

This step assumes that Kubernetes is already installed in the server or device if not please refer to 
- https://kubernetes.io/docs/setup/

#### Make sure that your kubernetes cluster has access to the docker image
Refer to this link
- https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/

Login to docker on the terminal
- `docker login`

Check `config.json` file of `.docker`
- `cat ~/.docker/config.json`

```
Note: If you use a Docker credentials store, you won't see that `auth` entry but a `credsStore` entry with the name of the store as value. In that case, you can create a secret directly. if not refer to this https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials
```

Create this secret naming it regcred:
- `kubectl create secret docker-registry regcred --docker-server=<your-registry-server> --docker-username=<your-name> --docker-password=<your-pword> --docker-email=<your-email>`

Where:
<your-registry-server> is your Private Docker Registry FQDN. Use https://index.docker.io/v1/ for DockerHub.
<your-name> is your Docker username.
<your-pword> is your Docker password.
<your-email> is your Docker email.

After that make sure that your kubernetes deployment file is using `regcred`
For Example:
```
apiVersion: v1
kind: Pod
metadata:
  name: private-reg
spec:
  containers:
  - name: private-reg-container
    image: <your-private-image>
  imagePullSecrets:
  - name: regcred
```

#### Deploy the kubernetes cluster to machine

Apply `.yaml` file to cluster
- `kubectl apply -f <name_of_deployment_file>.yaml`

Check if deployments are produced
- `kubectl get deployment`

Check if pods are working
- `kubectl get pods`

Check if Service are good
- `kubectl get services`




