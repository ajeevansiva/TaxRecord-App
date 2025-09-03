# Build stage
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- TaxRecord-frontend --configuration production

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist/TaxRecord-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
