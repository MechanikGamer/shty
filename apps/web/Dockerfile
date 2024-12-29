FROM node:23-alpine AS builder

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* ./ 

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN yarn install --production --frozen-lockfile --ignore-scripts && \
    rm -rf node_modules/@types


FROM node:23-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["yarn", "start"]
