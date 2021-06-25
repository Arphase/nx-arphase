# Arphase

This is the Arphase monorepo and it contains the projects for different clients in order to embrace code reusability.

In this docs you'll find the general guidelines in order to contribute in this repo, also a doc for each project can be accessed here.

This project was generated using [Nx](https://nx.dev).

## Commit Message Guidelines

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

### Revert

If the commit reverts a previous commit, it should begin with `revert:`, followed by the header of
the reverted commit. In the body it should say: `This reverts commit <hash>., where the hash is the
SHA of the commit being reverted.

### Type

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

### Scope

The scope should be the name of the library affected (as perceived by the person reading the
changelog generated from commit messages.

The scope will be the library directory.

Example for the auth ui module for innovatech `innovatech/ui/auth`

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Frontend

Here is everything you need to know to for getting started with the frontend project of Innovatech

### Setup

Steps to run the frontend project:

1. Install [NodeJS](https://nodejs.dev) in your computer.
2. Install the npm dependencies with the `npm install` command.
3. Install the Nx cli with the `npm install -g @nrwl/cli` command.

### Development server

Run `nx serve --project=<app-name>` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

### Generate a library

Run `nx generate @nrwl/angular:lib my-lib --directory=<project-name>` to generate a library.

Libraries are sharable across libraries and applications. They can be imported from the path declared in the file `tsconfig.base.json`.

### Code scaffolding

- Run `nx generate component my-component --project=<project-name>` to generate a new component.
- Run `nx generate service my-service --project=<project-name>` to generate a new service.
- Run `nx generate guard my-guard --project=<project-name>` to generate a new guard.
- Run `nx generate module my-module --project=<project-name>` to generate a new module.

### Build

These are the commands to build for different environments:

- Run `nx build --c=stage --project=<app-name>` for stage environment
- Run `nx build --prod --project=<app-name>` for production environment

The build artifacts will be stored in the `dist/` directory

### Running end-to-end tests

Run `nx e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

## Backend

### Setup

Each project has a different setup, you can read about them here:

- [Innovatech](docs/innovatech/README.md)
- [Music Revolution](docs/musicr/README.md)

### Generate a library

Run `nx generate @nrwl/nest:library my-lib --directory=<directory-name>` to generate a library.

Libraries are sharable across libraries and applications. They can be imported from the path declared in the file `tsconfig.base.json`.

### Code scaffolding

- Run `nx generate controller my-controller --project=<project-name>` to generate a new controller.
- Run `nx generate service my-service --project=<project-name>` to generate a new service.
- Run `nx generate guard my-guard --project=<project-name>` to generate a new guard.
- Run `nx generate module my-module --project=<project-name>` to generate a new module.

### Build

These are the commands to build for different environments:

- Run `nx build --c=stage --project=<app-name>` for stage environment
- Run `nx build --prod --project=<app-name>` for production environment

The build artifacts will be stored in the `dist/` directory

## Running unit tests

Run `nx test <library-name>` to execute the unit tests via [Jest](https://jestjs.io).
