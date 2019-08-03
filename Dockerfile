FROM nginx:mainline-alpine
RUN /bin/sh -c 'chmod -R 0755 /usr/share/nginx/html'
