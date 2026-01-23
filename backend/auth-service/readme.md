## 🔐 Auth Service – Prisma Setup

### Setup

1. Install Prisma and dependencies
```bash
npm install prisma@6.19 --save-dev
npm install @prisma/client@6.19 dotenv
```

2. Initalize Prisma
```bash
npx prisma init
```
3.😈 Configure Prisma Client 
generator client {
  provider = "prisma-client-js"
}

☠️ Don't forgot to do thrid step and remove the output key from the client object there is not need for it

