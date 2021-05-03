FROM node AS build
WORKDIR /app

COPY ./src .
RUN npm install
RUN npm run build -- --prod

FROM nginx AS final
COPY theolddude.nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/theolddude-website/* /usr/share/nginx/html/
