FROM nginx:1.12
MAINTAINER julian@tech.guildtv.co.uk

#add source
COPY dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
