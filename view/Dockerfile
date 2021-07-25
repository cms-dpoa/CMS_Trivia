#BUILD WEB APP
FROM node:12-alpine3.12 as build-stage
WORKDIR /view
COPY package.json .
RUN npm install
RUN npm audit fix
COPY . .
# RUN npm run test
RUN npm run build

# CREATE NGINX SERVER
FROM nginx:1.19.0-alpine as prod-stage
COPY --from=build-stage /view/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]