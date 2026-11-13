# Static build served by nginx. Ready for Railway or any container host.
FROM node:22-alpine AS build
RUN apk add --no-cache git
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# Railway sets PORT; nginx's template step substitutes it at start.
ENV PORT=8080
EXPOSE 8080
