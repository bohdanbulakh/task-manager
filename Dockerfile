FROM node:18-alpine as builder

WORKDIR /app
COPY . .
RUN npm install && \
    npm run build && \
    npm prune --prod && \
    npx prisma generate

FROM alpine as production

RUN apk --no-cache add nodejs
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

ENTRYPOINT ["node", "/app/dist/main.js"]
