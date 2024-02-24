# Etap 1: Zbuduj aplikację
FROM node:20 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etap 2: Uruchom serwer HTTP do obsługi zbudowanej aplikacji
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]