# Backend Starter Kit

:truck: A boilerplate for Node.js, Express, Postgre, Redis.


[Live Demo](https://web-go-demo.herokuapp.com/)


## Getting Started

1. Clone this Boilerplate

```bash
$ git clone --depth 1 https://github.com/Shyam-Chen/Backend-Starter-Kit.git <PROJECT_NAME>
$ cd <PROJECT_NAME>
```

2. Install Dependencies

```bash
$ yarn install && yarn typed
```

3. Run the Application

```bash
$ yarn start
```

4. Test the Application

```bash
$ yarn test
```

5. Build the Application

```bash
$ yarn build
```

## Dockerization

1. Build and run the container in the background

```bash
$ docker-compose up -d api
```

2. Run a command in a running container

```bash
$ docker-compose exec api <COMMAND>
```

3. Remove the old container before creating the new one

```bash
$ docker-compose rm -fs
```

4. Restart up the container in the background

```bash
$ docker-compose up -d --build api
```

5. Push images to Docker Cloud

```diff
# .gitignore

  .DS_Store
  node_modules
  npm
  dist
  coverage
+ dev.Dockerfile
+ stage.Dockerfile
+ prod.Dockerfile
  *.log
```

```bash
$ docker login
$ docker build -f ./tools/<dev|stage|prod>.Dockerfile -t <IMAGE_NAME>:<IMAGE_TAG> .

# checkout
$ docker images

$ docker tag <IMAGE_NAME>:<IMAGE_TAG> <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
$ docker push <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>

# remove
$ docker rmi <REPOSITORY>:<TAG>
# or
$ docker rmi <IMAGE_ID>
```

6. Pull images from Docker Cloud

```diff
# circle.yml

+ echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
  docker login -u="<DOCKER_USERNAME>" -p="${HEROKU_TOKEN}" registry.heroku.com
- docker build -f ./tools/<dev|stage|prod>.Dockerfile -t registry.heroku.com/<HEROKU_PROJECT>/web .
+ docker pull <DOCKER_ID_USER>/<IMAGE_NAME>:<IMAGE_TAG>
+ docker tag <IMAGE_NAME>:<IMAGE_TAG> registry.heroku.com/<HEROKU_PROJECT>/web
  docker push registry.heroku.com/<HEROKU_PROJECT>/web
```

## Configuration

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

## Using Libraries

1. Example of REST

```js
import { Router } from 'express';

import document from '~/document';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await document.List.find({}).exec();
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
```

2. Example of GraphQL

```js
import gql from 'graphql-tag';

import document from '~/document';

export const listTypeDefs = gql`
  type List {
    _id: ID!
    text: String!
  }

  type Query {
    list: [List]
  }
`;

export const listResolvers = {
  Query: {
    async list(root, { text }) {
      try {
        const data = await document.List.find({}).exec();
        return data;
      } catch (err) {
        console.error(err);
      }
    }
  }
};
```


4. Example of Relational

```js
export default (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    text: DataTypes.STRING
  });

  return List;
};
```

5. Example of Lodash

```js
import { of } from 'rxjs';
import { lowerFirst, pad } from 'lodash';

of(lowerFirst('Hello'), pad('World', 5))
  .subscribe(value => console.log(value));
  // hello
  // World
```

6. Example of ReactiveX

```js
import { timer, of } from 'rxjs';
import { mapTo, combineAll } from 'rxjs/operators';

timer(2000)
  .pipe(
    mapTo(of('Hello', 'World')),
    combineAll(),
  )
  .subscribe(value => console.log(value));
  // ["Hello"]
  // ["World"]
```

7. Example of Socket

```js
import { io } from '~/core/socket';

io.emit('A', { foo: 'bar' });
io.on('B', data => console.log(data));  // { foo: 'baz' }
```

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.1/socket.io.js"></script>
<script>
const socket = io();

socket.on('connect', () => console.log('WS: Accept a connection.'));

socket.on('A', data => {
  console.log(data);  // { foo: 'bar' }
  socket.emit('B', { foo: 'baz' });
});
</script>
```

8. Example of Redis

```js
import { client } from '~/core/redis';

client.hmset('thing', {
  foo: 'js',
  bar: 'html',
  baz: 'css'
});

client.hgetall('thing', (err, object) => {
  console.log(object);
});
```

## Directory Structure

```coffee
.
├── src
│   ├── core  -> core feature module
│   ├── document  -> mongodb models
│   ├── graphql  -> query language
│   ├── relational  ->  postgresql models
│   ├── rest  -> restful api
│   ├── shared  -> shared feature module
│   ├── api.js
│   └── env.js
├── tools
│   └── ...
├── .babelrc
├── .editorconfig
├── .eslintrc
├── .flowconfig
├── .gitignore
├── Dockerfile
├── LICENSE
├── README.md
├── circle.yml
├── docker-compose.yml
├── jest.config.js
├── package.json
├── processes.js
└── yarn.lock
```
