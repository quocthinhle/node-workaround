FROM node:16-alpine

WORKDIR /lequocthinh

# COPY package.json from current dir to the . (BASE DIR now is set to WORKDIR)

COPY package.json .

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]