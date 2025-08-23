
FROM nginx:stable-alpine-perl

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy all project files (including assets folder) to nginx html directory
COPY . /usr/share/nginx/html

# Expose port
EXPOSE 80
