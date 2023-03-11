# <img src="https://media2.giphy.com/media/QssGEmpkyEOhBCb7e1/giphy.gif?cid=ecf05e47a0n3gi1bfqntqmob8g9aid1oyj2wr3ds3mg700bl&rid=giphy.gif" width ="25"> <b>Flogger</b> - **A Medium Blog Compendium**

### Tech Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)

I created Flogger while attending Flatiron School in March 2023. It was my Phase 2 project, where we were asked to create a React app. It goes a bit beyond that, as I utilized technologies that weren't taught in the bootcamp, as well as a web-scraping technique. Scraping wasn't my first choice, but I was forced into it given the fact that Medium's native API is extremely limited.

I leveraged **NextJS13** as framework. My initial goal was to incorporate global state management with **Redux**, but it wasn't cooperating with Nextjs' new `app` folder feature, which is currently in beta. So instead, I opted for a combination of React's native methods, namely the _useContext & useReducer_ hooks. I believe managing the global state in this manner closely resembles what Redux does out of the box.

This Readme provides information about the project as well as instructions on how to clone/fork/run it in your environment.

## User Stories

❖ Upon visiting the homepage, the user is not logged in initially and hence routed to the general `/feed` path which aggregates posts from all our registered users.

❖ A Login button is presented in the navbar on the top right, which when initiated, it brings the user to the Login form.

❖ In case of a new user, a button for sign up is offered underneath the form that routes the user to the sign up form instead. The sign up form takes a Name, Email, Password(NOT SECURED) and the user's Medium username. Upon submitting the form, a POST request is sent to the backend, which stores the new user's information. Please note that passwords are stored in plain text. At this point the user is deemed Logged in and routed to the dashboard `./` homepage.

❖ In case of going the usual LOGIN route, the user is asked for an email they used to sign up on the app and associated password. Upon submitting the form, a GET request is then fetched to the backend, which checks if the email && password match as a pair in any of the entries in the **users** database. **If not**, the user is prompted to retry login. **If yes**, the user is deemed logged in and routed to the dashboard `./` homepage.

❖ It's worth noting that fetching blog data from Medium happens at the login/signup step. Data is stored in the local database for persistence and mutation.

❖ Upon Login, the navbar unveils 3 additional buttons for navigation - Dashboard, Feed & Favorites. In addition, a welcome message is being displayed in the navbar greeting the user by their name.

❖ `./` AKA Dashboard page is the logged in user's default page, where they can see information of their own personal blogs, as well as features like **favoriting & amount of accrued likes**. The blog posts are presented in a card format and offer information such as: Date published, List of Categories, Blog Title & a Short Excerpt, Author Avatar, Author Name and finally a link to the original article on Medium.

❖ Upon clicking the Blog Title, a user is routed to the expanded Blog Post View, where they can read the full article. I utilized **regex** to remove html tags from the scraped content.

❖ `./feed` is the main page in a sense that it offers a collection of all the blog posts of all registered users, as well as a category list in the form of pills at the top. Within each pill a COUNT is displayed, signifying the number of posts that have been tagged with the category.

❖ The user can click on the category pills which then filters the summary of categories down to the preferred category. The user can go back to viewing the feed in its entirety upon clicking the "VIEW ALL" pill sitting at the end of the array of categories. The pill also provides a count for all the posts currently present in the database.

❖ The user can search through the feed by inputing a desired query in the Search Bar, which filters through the blog posts' titles. Filtering works onChange, meaning that each keystroke is fetching the current results. Case insensitive & doesn't need to be an exact match.

❖ The user can **star** blog posts ~ also referred to as _liking_ || _favoriting_. Upon starring an article, a PATCH request is sent to the backend which updates the blog entry to be associated with the current user. The Star state is then changed to the corresponding behavior - whether you liked or unliked the article, as well as the current _likes_ count down below in the blog's card.

❖ `./favorites` is another accessible page, as suggested by the navbar. It is a collection of logged in user's favorite articles. Similar in structure to the dashboard, but offers a view of all starred articles.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app). I opted for v13 utilizing the new App folder. The feature is currently in beta.

After you clone the repo, first install the dependencies:

```bash
npm install
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Finally, run the json-server:

```bash
npm run server
```

Frontend: Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

Backend: Open [http://localhost:3001](http://localhost:3001) with your browser to see the db.json format.
Data that is being fetched is persisted in the db.json file in the root directory.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
