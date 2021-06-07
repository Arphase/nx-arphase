# Innovatech

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

