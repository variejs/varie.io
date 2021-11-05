FROM node:10-alpine as builder
RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .

# Build the project
RUN npm run prod


FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copy from the stahg 1
COPY --from=builder /build/public /app

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]