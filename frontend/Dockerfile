FROM node:22-alpine AS build
WORKDIR /app

# 빌드
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
# nginx가 읽을 dist 생성
RUN npx vite build

# 실행
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80