#stage 1
FROM node:16 as node
RUN mkdir /app
WORKDIR /app
COPY package*.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]
#FROM nginx:alpine
#COPY --from=node /app/dist/rrss-frontend /usr/share/nginx/html