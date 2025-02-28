# How to set up and configure this repo

## Secrets

The repo requires certain .env. files in order to establish connection to the databases. These are .gitnored to align with good industry practice, so you'll need to create these manually for you can start.

### creating .env. files

in the repo root folder, create the following files:

- .env.development
- .env.test

#### .env.development

add the line `PGDATABASE=nc_news`

#### .env.test

add the line `PGDATABASE=nc_news_test`

You should now be able to run `connection.js` to connect to `dev` or `test` databases.
