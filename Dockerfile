FROM node:alpine

# RUN rm -rf /tmp/node_modules
# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# WORKDIR /opt/app
# ADD . /opt/app
ENV HOME /backendtest

WORKDIR ${HOME}
ADD . $HOME

RUN npm install

# ENV NODE_ENV production
ENV REDIS_PORT 6379
ENV REDIS_HOST redis
ENV POSTGRES_URL postgres://postgres@postgres:5432/testblogapi
EXPOSE 3005

CMD ["npm", "start"]
