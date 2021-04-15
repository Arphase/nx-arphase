# Innovatech

This project was generated using [Nx](https://nx.dev).

## Common
### Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more
readable messages that are easy to follow when looking through the project history. But also, we use
the git commit messages to generate the CHANGELOG.

Each commit message consists of a header, a body and a footer. The header has a special format that
includes a type, a scope and a subject:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The header is mandatory and the scope of the header is optional.

Any line of the commit message cannot be longer 100 characters! This allows the message to be easier
to read on GitHub as well as in various git tools.

The footer should contain a closing reference to an issue if any.

#### Revert
If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of
the reverted commit. In the body it should say: `This reverts commit <hash>., where the hash is the
SHA of the commit being reverted.

#### Type
Must be one of the following:

- **build:** Changes that affect the build system or external dependencies (example scopes: gulp,
  broccoli, npm)
- **ci:** Changes to our CI configuration files and scripts (example scopes: Travis, Circle,
  BrowserStack, SauceLabs)
- **docs:** Documentation only changes
- **feat:** A new feature
- **fix:** A bug fix
- **perf:** A code change that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **style:** Changes that do not affect the meaning of the code (white-space, formatting, missing
  semi-colons, etc)
- **test:** Adding missing tests or correcting existing tests

#### Scope
The scope should be the name of the npm package affected (as perceived by the person reading the
changelog generated from commit messages.

The following is the list of supported scopes:

- auth
- companies
- dashboard
- data
- groups
- guarantees
- products
- spa
- state
- ui
- users
- utils

#### Subject
The subject contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

#### Body
Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Footer
The footer should contain any information about **Breaking Changes** and is also the place to
reference Jira issues that this commit **Closes**.

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The
rest of the commit message is then used for this.

### Understand your workspace
Run `nx dep-graph` to see a diagram of the dependencies of your projects.

### Running unit tests
Run `nx test` to execute the unit tests via [Jest](https://jestjs.io). 

---

## Frontend
Here is everything you need to know to for getting started with the frontend project of Innovatech

### Setup
Steps to run the frontend project: 

1) Install [NodeJS](https://nodejs.dev) in your computer.
2) Install the npm dependencies with the `npm install` command.
3) Install the Nx cli with the `npm install -g @nrwl/cli` command.

### Development server
Run `nx serve` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Generate a library
Run `nx generate @nrwl/angular:lib my-lib --directory=ui` to generate a library.

Libraries are sharable across libraries and applications. They can be imported from `@ivt/mylib`.

### Code scaffolding
#### Application
- Run `nx generate component my-component` to generate a new component.
- Run `nx generate service my-service` to generate a new service.
- Run `nx generate guard my-guard` to generate a new guard.
- Run `nx generate module my-module` to generate a new module.
#### Library
- Run `nx generate component my-component --project="my-lib"` to generate a new component.
- Run `nx generate service my-service --project="my-lib"` to generate a new service.
- Run `nx generate guard my-guard --project="my-lib"` to generate a new guard.
- Run `nx generate module my-module --project="my-lib"` to generate a new module.

### Build
These are the commands to build for different environments:
- Run `nx build --c=qa` for QA environment
- Run `nx build --prod` for PROD environment

The build artifacts will be stored in the `dist/` directory

### Running end-to-end tests
Run `nx e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

---

## Backend
### Setup
1) Create a new postgres database in order to start working with the api.
These is the info you need to set up:

- Host: localhost
- Database: innovatech_dev
- username: innovatech
- password: innovatech

2) Create an alias in your terminal to set the following environment variables:
```
alias ivt="SMTP=email-smtp.us-east-1.amazonaws.com MAIL_PORT=587 MAIL_ACCOUNT=<Ask the tech lead for this variable> MAIL_PASS=<Ask the tech lead for this variable> MAIL_ACCOUNT_SENDER=no-reply@innovatechcorp.com MAIL_HOST_URL=http://localhost:4200/auth/set-password JWT_SECRET=test JWT_EXPIRATION=360000 HOST=localhost DATABASE=innovatech_dev USERNAME=innovatech PASSWORD=innovatech"
```

3) You can now start the api with the development server command, this will synchronize your database with the entities of the backend project.

4) You'll need to run the following command in order to have a username in the application `npm run seed`. When the command finished you can run the development server again and start using the app.

### Development server
Run `ivt nx serve innovatech-api` for a dev server. Navigate to http://localhost:3333/. The app will automatically reload if you change any of the source files.

### Generate a library
Run `nx generate @nrwl/nest:library my-lib --directory=api` to generate a library.

Libraries are sharable across libraries and applications. They can be imported from `@ivt/mylib`.

### Code scaffolding
Unfortunately I haven't found any way to scaffold NestJS code using Nrwl, what I usually do is the following: 

1) Install the nest cli with `npm i -g @nestjs/cli`
2) Go the the app project `cd apps/innovatech-api/src/app`
3) Run the commands

- Run `nest generate controller my-controller` to generate a new controller.
- Run `nest generate service my-service` to generate a new service.
- Run `nest generate guard my-guard` to generate a new guard.
- Run `nest generate module my-module` to generate a new module.

### Build
Run `nx build innovatech-api --prod` for any environment, the environment variables exist in the ElasticBeanstalk environment of the application

The build artifacts will be stored in the `dist/` directory

### Running unit tests
Run `nx test` to execute the unit tests via [Jest](https://jestjs.io).
