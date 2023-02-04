FROM node:18-alpine

WORKDIR /app
COPY . .
RUN yarn --frozen-lockfile --network-timeout=300000

ENV NEXT_TELEMETRY_DISABLED 1

CMD yarn dev