FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY packages ./packages
COPY apps/api ./apps/api
RUN npm install
RUN npm --workspace=@sikoni/shared run build
RUN npm --workspace=@sikoni/api run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 4000
CMD ["npm", "--workspace=@sikoni/api", "run", "start:prod"]

