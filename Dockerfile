FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY ./Frontend/package*.json ./

RUN npm install

COPY ./Frontend .

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


FROM node:20-alpine

WORKDIR /app

COPY ./Backend/package*.json ./

RUN npm install

COPY ./Backend .

COPY --from=frontend-builder /app/dist ./public

EXPOSE 8000

CMD ["node", "src/index.js"]