<h1>FolkSoul API</h1>
<p>Using the FolkSoul API you can add / modify / read / delete members, social links and band information</p>

#

## Table of Contents

- [](#)
  - [Table of Contents](#table-of-contents)
- [](#-1)
  - [Prerequisites](#prerequisites)
- [](#-2)
  - [Tech Stack](#tech-stack)
- [](#-3)
  - [Getting Started](#getting-started)
- [](#-4)
  - [Project Structure](#project-structure)
- [](#-5)
  - [Resources](#resources)

#

## Prerequisites

- <img style="padding-right:10px;" align="left"  src="readme/assets/nodejs.png"   height="22"/> <p>_Node JS @12.X and up_</p>
- <img style="padding-right:10px;" align="left"  src="readme/assets/npm.png"   height="20"/> <p>_npm @6 and up_</p>

#

## Tech Stack

- <img style="padding-right:10px;" align="left"  src="readme/assets/nodejs.png"   height="25"/> <p><a href="https://nodejs.org/en/" target="_blank">[NodeJS @16.15.1]</a> - JavaScript runtime built on Chrome's V8 JavaScript engine<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/express.png"   height="25"/> <p><a href="https://expressjs.com/" target="_blank">[Express @4.18.1]</a> - Fast, unopinionated, minimalist web framework for Node.js<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/mongodb.png"   height="25"/> <p><a href="https://www.mongodb.com/" target="_blank">[MongoDB]</a> - Open source NoSQL database management program<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/mongoose.png"   height="25"/> <p><a href="https://mongoosejs.com/" target="_blank">[mongoose @6.3.6]</a> - elegant mongodb object modeling for node.js<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/typescript.png"   height="20"/> <p><a href="https://www.typescriptlang.org/" target="_blank">[Typescript @4.7.4]</a> - TypeScript is JavaScript with syntax for types.<p/>

- <img style="padding-right:10px;" align="left"  src="readme/assets/swagger.png"   height="25"/> <p><a href="https://www.npmjs.com/package/swagger-ui-express" target="_blank">[Swagger UI Express @4.4.0]</a> - Serve auto-generated swagger-ui generated API docs from express<p/>

#

## Getting Started

1\. First of all you need to clone repository from github:

```sh
git clone https://github.com/Saba-Var/folksoul-api.git
```

2\. Next step requires install all the dependencies

```sh
npm install
```

or

```sh
yarn install
```

3\. Copy .env

```sh
cp .env.example .env
```

4\. If you want you can also change default configuration of .env file and connect to mongodb

```sh
MONGO_DATABASE=folksoul
MONGO_PROTOCOL=mongodb
MONGO_HOST=localhost
MONGO_PORT=27017
MONGO_CLUSTER=''

SERVER_PORT=5001

ACCESS_TOKEN_SECRET=secret-text

USER_PASSWORD=***
USER_EMAIL=***
```

5\. For the first time before run the API run following command:

```sh
npx tsc
```

6\. after that you can run FolkSoul API from terminal:

```sh
npm run dev
```

7\. To create new user from the terminal run the following command:

```sh
npm run user:create
```

To see swagger documentation visit [localhost:5001/api-docs](http://localhost:5001/api-docs)


#

## Project Structure

```bash
├─── readme
├─── src
│    ├── bin
│    ├── config
│    ├── controllers
│    ├── middlewares
│    ├── models
│    ├── routes
│    └── schemas
- .env
- .eslintrc.json
- .gitignore
- .prettierrc.json
- babel.config.json
- package.json
- README.md
- tsconfig.json


```

#

## Resources

- [Application Details](https://redberry.gitbook.io/assignment-iii-folksoul/)
- [Git commit rules](https://redberry.gitbook.io/resources/git-is-semantikuri-komitebi)
