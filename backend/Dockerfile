FROM node:8
ARG proxy
ARG app_path
ARG app_name

WORKDIR $app_path

COPY package*.json $app_path/

RUN npm install

RUN mkdir -p /log $app_path/upload

COPY . $app_path/.

CMD ["npm","run","dev"]
