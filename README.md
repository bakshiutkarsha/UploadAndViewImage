# Thinkific Multi-User Journal Assignment

## Getting Started

### 1. Get to know project tech stack

This simple project is a starting point for your take-home test. It is built with the following technologies:

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
  - Scaffolding is set up for SQLite
  - You are free to use other databases of your choice

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

## Submission

Update this README file by answering the questions below.

### Date Or Reflection

August 16, 2021

### Location of deployed application (not necessary for Junior Engineers)

https://thinkify-journal-app.herokuapp.com

*In Heroku, **thinkific** name was taken so I had to use **thinkify** in the url

### Instructions to run assignment locally

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

### Time spent

Basic-development: 3-4 hr
Polishing: 1 hr
Deployment: 1 hr
Total: 6-7 hr

### Assumptions made

Assuming there are mutilple users using this application, once user enters it's email, we create a db entry for that user with all the user details (name and email). If the same user tries to create the entry using same email but with different name, the already stored name in db would show up and not the new name enetered by user, because we are finding the user by unique identifier "email", and if it exists the User table it will return the data already stored in db.

### Shortcuts/Compromises made

- Didn't create service layer for API calls
- Error handling on server side (no try-catch blocks)

### Assume your application will go into production...

#### 1) What would be your approach to ensuring the application is ready for production (testing)?
There are two basic things that needs to be done before it is ready for production:
- We need to have e2e setup (Cypress) for the happy path flow, which in our case would be:
  - Checking the form input, the different usecases for it can be:
    1. Try to "Post" without filling anything in form, there should be error saying "Field cannot be empty" 
    2. Try to "Post" with html tags in form, there should be error saying "Field cannot contain HTML tags"
    3. Try to "Post" a url in any of fields, there should be error saying "Field cannot contain URLs "
  - As soon as the call succeed:
    1. Check the route redirected to "/"
    2. Compare the length of the API response of number of posts and number of elements present in DOM
    3. Check the content of very first element matches with the recent post

- We need to have unit test (jest )setup for backend:
  - Unit tests written for all the API calls, services(if any)
  - Unit tests for helper functions

- Load testing our APIs to make sure they can handle many requests simultaneously
 
#### 2) How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?

For the current NextJS deployment Heroku is being used and for the database Heroku hosted PostgreSQL is being used. They should be able to handle 1000s of concurrent users if the scaling rules are set up to handle such high traffic. In addition to that, 

1. We can have a CDN setup (for eg. Cloudflare) to utilize its caching capabilities and to serve the content faster from various regions
2. Apart from that, as far as technical code improvements are concerned,
  - Ensuring that we are using the best optimised techniques to serve our code
    - Code-splitting is done properly
    - Tree-shaking is implemented
    - Bundling

#### 3) What key steps would you take to ensure application security?

I have made sure that any sensitive key/data is accessed through env variables instead of it being hardcoded in the application code. Moreover, the IAM user corresponding to AWS access credentials used in the app has minimum set of permissions granted to it so that even if the key is compromised, the damage can be limited.  

1. We are using forms in our application, which are at the highest security risk because that's the only way to post something in database. So, firstly we need to make sure that the input for each field is sanitized, so in my current solution I have implemented the sanitizing of the string which will not allow you to:
- Input HTML tags
- Input URL's
- No empty input

2. The second things that can be implemented to save from bot attack is to implement a solution like "ReCaptcha" in our form to make sure that the request is not coming from the bot. If we implement this we need to create a middleware which will check the captcha_score before every call

3. Ensuring that the request is served on "https"

4. Implementing a auth mechanism for every request, to ensure only authenticated users can have access to the application.

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.
- Implementing lazy loading for images
- Empty state saying "No Post found" for initial load
- Error notification on front-end

### Other information about your submission that you feel it's important that we know if applicable.

Apart from the required user stories, I have implemented the following functionalities in the application: 

- Image upload while creating a journal post. The image is stored in a S3 bucket.
- Translation of journal text from English to Hindi. 
- Responsive web design for the application. 

### Your feedback on this technical challenge

If you can chnage the Db from sqlite to postgresql it will benefit the person who is developing the application because sqlite being sereverless is hard to host. I spent a lot of time figuring out that, first tried on Netlify, after so much of research I got the info that isn't possible and then I tried on Heroku, again so many issues were coming up, finally I changed it to postgresql and it worked. I highly recommend that as it will save lot of dev time.
