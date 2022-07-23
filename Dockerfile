FROM nginx:1.23.1

RUN apt update \
    && apt upgrade -y \
    && curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && mkdir -p /app

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
RUN mkdir -p /usr/share/nginx/html
RUN cp -a build/. /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
