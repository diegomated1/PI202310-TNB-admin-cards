FROM node:18-alpine3.16

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
RUN npm install -g typescript
COPY . .
RUN npm run build
EXPOSE 3000
CMD "npm" "start"