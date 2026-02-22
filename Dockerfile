
FROM node:lts-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

FROM nginx:alpine

COPY --from=builder /app/dist/Elia/browser /usr/share/nginx/html

RUN echo ' server { listen 80; root /usr/share/nginx/html; location = / { return 302 /home; } location / { try_files $uri $uri/ /index.html; }} ' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]