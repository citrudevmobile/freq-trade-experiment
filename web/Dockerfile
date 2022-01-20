FROM node:17

# setup app directory
WORKDIR /usr/src/app

# copy app source code
COPY . .

# Install dependencies
RUN npm install

CMD npm run build