# stage: 1
FROM node:13-alpine as builder
WORKDIR /app 
COPY . /app
ENV PATH /app/node_modules/.bin:$PATH
RUN yarn
RUN yarn build:staging

# Stage 2 - the production environment
FROM nginx:alpine
LABEL maintainer="web-back"
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

