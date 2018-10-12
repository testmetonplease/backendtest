# BackendTest 

:truck: A api for blog - Node.js, Express, Postgre, Redis.

## REST API

### AUTH

```rest
* POST  /auth/register    // Allow to all
        {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password
        }
* POST  /auth/login       // Allow to all
        {
          email: req.body.email,
          password: req.body.password
        }
* GET   /auth/logout      // User must be logged
```

### User

```rest
* GET   /api/users         // Allow to all
* GET   /api/users/count   // Allow to all
* PUT   /api/users/:id     // User must be logged
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role      ['USER' OR 'ADMIN']
      }
```

### Blog
```rest
* Get count  GET /api/blog/count   // Allow to all
        Example:
           GET   /api/blog/count?where={"author": "968b2700-c962-11e8-9e46-91181531596c"}
           
* Get all    GET /api/blog         // Allow to all
        Example:
           GET   /api/blog?where={"author": "968b2700-c962-11e8-9e46-91181531596c"}
         
* Create     POST /api/blog        // User must be logged 
               {
                __v: req.body.__v,
                title: req.body.title,
                metaTitle: req.body.metaTitle,
                metaDescription: req.body.metaDescription,
                metaKeywords: req.body.metaKeywords,
                body: req.body.body,
             *   authorName:  taken from current session
             *   author:  taken from current session
          }
* Read       GET /api/blog/:id     // Allow to all
* Update     PUT /api/blog/:id     // User must be logged
               {
                __v: req.body.__v,
                title: req.body.title,
                metaTitle: req.body.metaTitle,
                metaDescription: req.body.metaDescription,
                metaKeywords: req.body.metaKeywords,
                body: req.body.body,
                authorName: pass.user.firstname,
            *   authorName:  taken from current session
            *   author:  taken from current session
               }
* Delete     DELETE /api/blog/:id  // Allow to role 'ADMIN'
```

### Comments

```rest
* Get count   GET /api/comments/count    // Allow to all
        Example:
           GET   /api/comments/count?where={"author": "968b2700-c962-11e8-9e46-91181531596c"}

* Get all     GET /api/comments          // Allow to all 
        Example:
           GET   /api/comment?where={"author": "968b2700-c962-11e8-9e46-91181531596c"}
         
* Create      POST /api/comments         // User must be logged
                {
                __v: req.body.__v,
                title: req.body.title,
                text: req.body.text,
            *   author:  taken from current session
                parentId: req.body.parentId,
                articleId: req.body.articleId,
              }
* Read        GET /api/comments/:id      // Allow to all
* Update      PUT /api/comments/:id      // User must be logged
               {
                __v: req.body.__v,
                title: req.body.title,
                text: req.body.text,
            *   author:  taken from current session
                parentId: req.body.parentId,
                articleId: req.body.articleId,
                status: req.body.status
             }
* Delete      DELETE /api/comments/:id   // Allow to role 'ADMIN'
```


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

### local Dockerization

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
# Dockerfile
ENV SECRET <PUT_YOUR_SECRET_HERE>
ENV POSTGRES_URL <PUT_YOUR_POSTGRES_URL_HERE>
ENV REDIS_PORT <PUT_YOUR_REDIS_PORT_HERE>
ENV REDIS_HOST <PUT_YOUR_REDIS_HOST_HERE>
```


