FROM node:20 AS build_image

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:20-slim AS run_image

WORKDIR /app

COPY --from=build_image /app/dist ./dist
COPY package*.json ./

RUN npm install --only=prod

EXPOSE 3000

CMD ["node", "dist/main"]
