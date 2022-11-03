FROM node:16 as builder 
#also say 
WORKDIR /usr/src/app

#copy the react app to the container
COPY . .

# #prepare the contiainer for building react 
RUN npm install --legacy-peer-deps && npm run build

#prepare nginx
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /usr/src/app/build .

#fire up nginx 
CMD ["nginx","-g","daemon off;"]