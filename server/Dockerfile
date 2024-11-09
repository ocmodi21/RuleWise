FROM node:20-alpine

WORKDIR /RuleWise

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY src/ ./src

RUN pnpm install
RUN pnpm run build

ENTRYPOINT ["sh", "-c"]
CMD ["pnpm start"]
