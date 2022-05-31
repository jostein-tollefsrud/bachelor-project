# Development of a new website for the Student House in Gjøvik

> «How to optimize and improve the user-friendliness of the web solution for the Student House in Gjøvik»

**Bachelor thesis in Web Development**

**13. may 2022**

[_Live demo here_](https://husetgjovik-beta.herokuapp.com/)

---

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Contact](#contact)

## General Information

This is the source code for our Bachelor thesis in Web Development.

The project has optimized and improved the user-friendliness for the Student House in Gjøvik by making it easier to maintain the content of the website, and improved the design for a more understandable navigation through the site.

_All images are from Studenthuset in Gjøvik and from [Unsplash.com](https://unsplash.com/)_

<!-- You don't have to answer all the questions - just the ones relevant to your project. -->

## Technologies Used

### Frontend:

- [@emotion/react](https://www.npmjs.com/package/@emotion/react) – version 11.8.1
- [@emotion/server](https://www.npmjs.com/package/@emotion/server) – version 11.4.0
- [@emotion/styled](https://www.npmjs.com/package/@emotion/styled) – version 11.8.1
- [@mui/icons-material](https://www.npmjs.com/package/@mui/icons-material) – version 5.5.1
- [@mui/material](https://www.npmjs.com/package/@mui/material) – version 5.5.0
- [@panelbear/panelbear-nextjs](https://www.npmjs.com/package/@panelbear/panelbear-nextjs) – version 1.0.3
- [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail) – version 7.6.2
- [@sentry/nextjs](https://www.npmjs.com/package/@sentry/nextjs) – version 6.19.6
- [axios](https://www.npmjs.com/package/axios) – version 0.26.0
- [dayjs](https://www.npmjs.com/package/dayjs) – version 1.10.8
- [dotenv](https://www.npmjs.com/package/dotenv) – version 16.0.0
- [feather-icons-react](https://www.npmjs.com/package/feather-icons-react) – version 0.5.0
- [formik](https://www.npmjs.com/package/formik) – version 2.2.9
- [formik-material-ui](https://www.npmjs.com/package/formik-material-ui) – version 4.0.0-alpha.2
- [marked](https://www.npmjs.com/package/marked) – version 4.0.12
- [next](https://www.npmjs.com/package/next) – version 12.1.0
- [qs](https://www.npmjs.com/package/qs) – version 6.10.3
- [react](https://www.npmjs.com/package/react) – version 17.0.2
- [react-cookie-consent](https://www.npmjs.com/package/react-cookie-consent) – version 7.4.1
- [react-dom](https://www.npmjs.com/package/react-dom) – version 17.0.2
- [react-icons](https://www.npmjs.com/package/react-icons) – version 4.3.1
- [react-markdown](https://www.npmjs.com/package/react-markdown) – version 8.0.1
- [rehype-raw](https://www.npmjs.com/package/rehype-raw) – version 6.1.1
- [remark-gfm](https://www.npmjs.com/package/remark-gfm) – version 3.0.1
- [sanitize-html](https://www.npmjs.com/package/sanitize-html) – version 2.7.0
- [sass](https://www.npmjs.com/package/sass) – version 1.49.9
- [yup](https://www.npmjs.com/package/yup) – version 0.32.11

### Backend:

- [@strapi/plugin-documentation]() – version 4.1.5
- [@strapi/plugin-i18n]() – version 4.1.5
- [@strapi/plugin-sentry]() – version 4.1.5
- [@strapi/plugin-seo]() – version 1.7.2
- [@strapi/plugin-users-permissions]() – version 4.1.5
- [@strapi/strapi]() – version 4.1.5
- [sqlite3]() – version 5.0.2
- [strapi-plugin-sitemap]() – version 2.0.6

## Features

- Internationalization (i18N)
- Dynamically rendered pages

## Setup

> For this project you will need to have Node.js with npm installed. If not, [download Node.js here](https://nodejs.org/en/download/) and install it on your computer.

This directory contains two folders: backend and frontend.

Open up two terminals, one for each folder.
Navigate to backend in one and frontend i the other.

Terminal one:
`~/frontend`

Terminal two:
`~/backend`

Run this command in both terminals to install all packages:
`npm install`

## Usage

Now you can start using the application. You can either run the frontend or backend for development, or as a server.

_For safety reasons we have removed the ability to run the build script in backend to prevent the cashe and tmp folder to be overwritten and removing the content made._

### Development mode

**If you want to run it in development mode, first start the Strapi backend:**

```
# Inside backend directory, run develop:
npm run develop

# In development mode you can make new collections and edit the entire app.
```

To manage the project, go to the administration panel at: http://localhost:1337/admin

To access the server, go to: http://localhost:1337

> Email for login in: admin@admin.com
> Password for login: Admin123

**Then run the Next.js frontend:**

```
# Inside frontend directory, run dev:
npm run dev
```

The frontend will be served at [localhost:3000](http://localhost:3000)

### Server mode

**To run Strapi in server mode, first start the Strapi backend:**

```
# Inside backend directory, run start:
`npm run start`

# In server mode you will not have access to modify or add new collections.
```

To manage the project, go to the administration panel at: http://localhost:1337/admin

To access the server, go to: http://localhost:1337

> Email for login in: admin@admin.com
> Password for login: Admin123

**Then run the Next.js frontend build script:**

```
# Run build script inside frontend directory:
npm run build
```

**Now run the Next.js frontend server:**

```
# Run start script inside frontend directory:
npm run start
```

The frontend will be served at [localhost:3000](http://localhost:3000)

For more information and documentation for the technologies used in this project, visit the official documentation:

[Documentation for Next.js](https://nextjs.org/docs/getting-started)

[Documentation for Strapi](https://docs.strapi.io)

[Documentation for Sentry.io](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

[Documentation for Panelbear](https://panelbear.com/docs/)

## Project Status

Project is: _complete_

## Room for Improvement

- Split up the code in more components in frontend for better organization.
- Add more comments inside code.

## Contact

Created by [Jostein](https://www.josteintollefsrud/), [Leonard](https://github.com/SometimesGood) and [Ida](https://github.com/Idahpews) - feel free to contact us!
