# -- Base Node --
FROM node:16-alpine AS base

# -- Set working directory --
WORKDIR /app

# -- Copy project files --
COPY package.json ./package.json


# -- Install node packages for development --
RUN npm install

# -- Production Build --
FROM base AS production

# -- Copy other project files --
COPY .env.example ./.env
COPY next.config.js ./next.config.js
COPY tsconfig.json ./tsconfig.json

# -- Copy source code --
COPY src ./src
COPY public ./public

COPY src/assets/fonts ./src/assets/fonts
COPY src/lib/ThemeRegistery ./src/lib/ThemeRegistery

# Build the production application
RUN npm run build

# -- Base Node --
FROM node:16-alpine AS build

# -- Set working directory --
WORKDIR /app 
COPY --from=production /app/node_modules ./node_modules 
COPY --from=production /app/.next ./.next 
COPY --from=production /app/package.json ./package.json 
# COPY --from=production /app/.env ./.env 

# -- Expose listening port --
EXPOSE 3000

ENV NEXT_PUBLIC_CAPTCH_ID ed4a5e1c3da5653388c738d2dafe2afa
ENV NEXT_PUBLIC_SERVER_URL http://82.115.26.242:30010

# -- Start the application in production mode --
CMD ["npm", "start"]
