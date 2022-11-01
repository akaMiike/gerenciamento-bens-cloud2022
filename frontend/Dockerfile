# First stage: build webapp image

FROM node:14.19-alpine AS webapp_build

#USER react

WORKDIR /home/react/webapp

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build


# Second stage: copy static files to nginx & configure nginx
FROM nginx

COPY webapp.conf /etc/nginx/conf.d/default.conf

COPY --from=webapp_build /home/react/webapp/build /var/www/frontend

