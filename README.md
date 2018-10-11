# BackendTest 

:truck: A boilerplate for Node.js, Express, Postgre, Redis.





## Getting Started

1. Clone this Blog Api

```bash
$ git clone --depth 1 https://github.com/testmetonplease/backendtest.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install Dependencies

```bash
$ yarn install
```

3. Run the Application

```bash
$ yarn start
```


5. Build the Application

```bash
$ yarn build
```

## local Dockerization

1. Build  the container 

```bash
$ docker-compose build --no-cache
```
2. Build and run the container in the background

```bash
$ docker-compose up --force-recreate
```

3. Restore sql dump  in a running postgres container

```bash
$ docker exec -it postgres_container  -d 'postgres://postgres@localhost:5432/testblogapi’ sql/db.sql
```


### Default environments

Set your local environment variables.

```js
// src/env.js
export const SECRET = process.env.SECRET || <PUT_YOUR_SECRET_HERE>;
export const POSTGRES_URL = process.env.POSTGRES_URL || <PUT_YOUR_POSTGRES_URL_HERE>;
export const REDIS_PORT = process.env.REDIS_PORT || <PUT_YOUR_REDIS_PORT_HERE>;
export const REDIS_HOST = process.env.REDIS_HOST || <PUT_YOUR_REDIS_HOST_HERE>;

```

### Deployment environments

Set your deployment environment variables.

```dockerfile
# Dockerfile.<dev|prod>
ENV SECRET <PUT_YOUR_SECRET_HERE>
ENV POSTGRES_URL <PUT_YOUR_POSTGRES_URL_HERE>
ENV REDIS_PORT <PUT_YOUR_REDIS_PORT_HERE>
ENV REDIS_HOST <PUT_YOUR_REDIS_HOST_HERE>
```


