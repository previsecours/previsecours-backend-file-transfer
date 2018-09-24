FROM node:8
ARG proxy
ARG app_path
ARG app_name
ENV APP $app_name
ENV conf $app_path/conf

COPY package*.json ./
RUN npm install

RUN mkdir -p /log $app_path/upload

COPY . .

WORKDIR $app_path

EXPOSE 8081

CMD ["npm","run","dev"]
