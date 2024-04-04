#STAGE 1
FROM node:18.17.1 as build
WORKDIR /usr/src/app
COPY notesWeb/package*.json ./
RUN npm install
RUN npm install -g @angular/cli@latest
COPY /notesWeb .
RUN npm run build



#STAGE 2
FROM nginx:latest
COPY /notesWeb/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/diary-web/browser /usr/share/nginx/html
