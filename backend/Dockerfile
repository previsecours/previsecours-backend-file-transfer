FROM node:8
ARG proxy
ARG app_path
ARG app_name

WORKDIR $app_path

COPY package*.json $app_path/

RUN npm config `echo $proxy | sed 's/^$/delete proxy/;s/\(\S\S*\)/set proxy \1/'`
RUN npm i npm@latest -g
RUN npm install --verbose
RUN npm audit fix --force

RUN mkdir -p /log $app_path/upload

COPY . $app_path/.

CMD ["npm","run","dev"]
