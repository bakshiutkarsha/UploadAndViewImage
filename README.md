
## Getting Started

### 1. Get to know project tech stack

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
  - Scaffolding is set up for SQLite

### 2. Install npm dependencies

```
yarn
```

### 3. Create .env file

```
cp .env.example .env
```

### 4. Prepare DB

Create a local SQLite database and run migrations.

```
npx prisma migrate dev --name init
```

Seed the database with the sample data from [`prisma/seed.js`](./prisma/seed.js).

```
npx prisma db seed --preview-feature
```

### 5. Start the app

```
yarn dev
```

The app is now running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

### Location of deployed application

https://thinkify-journal-app.herokuapp.com

### Instructions to run locally

Make sure you have postgres installed locally, in .env, you need to replace

```
DATABASE_URL=postgresql://username:password@host:port/dbname
NEXT_PUBLIC_BUCKET=your-s3-bucket-name
NEXT_PUBLIC_REGION=your-s3-bucket region
NEXT_PUBLIC_ACCESS_KEY_ID=your-s3-access-key-id
NEXT_PUBLIC_SECRET_ACCESS_KEY=our-s3-secret-access-key
```

to run the db locally and to enable S3 bucket for file upload.
I have these variables set-up in heroku
