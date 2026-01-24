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


### Error Handler(Middleware)

1. Make the AppError Class (Derived class of Error class)

2. Make Sub-Classes of the AppError (ValidationError, ForbiddenError, DatabaseError, RateLimitError, AuthenticationError, NotFoundError)

3. Make a middleware which will handle all the cases


## User Registration

1. Senitization of User Registration Data

2. Check for the OTP Restriction

3. Send Email

4. Put the otp into the redis
