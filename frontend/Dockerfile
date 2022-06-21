FROM node:latest
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
ARG API_URL
ENV API_URL $API_URL
CMD ["yarn", "dev"]
