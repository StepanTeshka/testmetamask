FROM node:21-alpine as prod-deps

RUN apk add --no-cache make gcc g++ python3

WORKDIR /app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install --production=true --frozen-lockfile --ignore-scripts

FROM node:21-alpine as build

RUN apk add --no-cache make gcc g++ python3

WORKDIR /app

COPY . .
RUN yarn install --frozen-lockfile
RUN yarn build

FROM node:21-alpine as runner
WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/next.config.js ./next.config.js

CMD ["yarn", "start"]