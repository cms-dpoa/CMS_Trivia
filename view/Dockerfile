#BUILD WEB APP
FROM node:12-alpine3.12 as build-stage
WORKDIR /view
COPY package.json .
RUN npm install
RUN npm audit fix
COPY . .
RUN npm run build

# CREATE NGINX SERVER
FROM nginxinc/nginx-unprivileged  as prod-stage
COPY --from=build-stage /view/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]