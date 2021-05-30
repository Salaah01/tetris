FROM nginx:1.21

RUN apt update \
    && apt upgrade -y \
    && curl -sL https://deb.nodesource.com/setup_13.x | bash - \
    && apt-get install -y nodejs \
    && mkdir -p /app

WORKDIR /app
COPY . .

RUN npm install && npm audit fix
RUN npm run build
RUN ls -lrt
RUN mkdir -p /usr/share/nginx/html
RUN cp -a build/. /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
