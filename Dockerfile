FROM node:latest as Build
WORKDIR /app
COPY package*.json ./
RUN npm install
EXPOSE 3000
ENV NODE_ENV development
CMD ["npm", "start"]
