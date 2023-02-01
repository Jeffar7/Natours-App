#using node images
FROM node:latest

ENV NODE_ENV=production

# Create app directory
WORKDIR /app

#Install app dependency
COPY ["package.json","package-lock.json*" ,"./"]

#install npm package
RUN npm install --production

#Copy Entiry source code to images
COPY . .

EXPOSE 3000

#Run App
CMD ["node", "server.js"]