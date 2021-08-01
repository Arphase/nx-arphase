# Music Revolution

## Backend

### Setup
1) Create a new postgres database in order to start working with the api.
These is the info you need to set up:

- Host: localhost
- Database: musicr
- username: musicr
- password: musicr

2) Create an alias in your terminal to set the following environment variables:
```
alias musicr="JWT_SECRET=test JWT_EXPIRATION=360000"
```

3) You can now start the api with the development server command, this will synchronize your database with the entities of the backend project.

4) You'll need to run the following command in order to have a username in the application `npm run musicr:seed`. When the command finished you can run the development server again and start using the app.

### Development server
Run `musicr nx serve musicr-api` for a dev server. Navigate to http://localhost:3333/. The app will automatically reload if you change any of the source files.

