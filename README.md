# Gribbit Backend

![Node.js](https://img.shields.io/badge/Node.js-v20.0.0-green) ![Postgres](https://img.shields.io/badge/Postgres-15.0-blue) ![License](https://img.shields.io/badge/license-MIT-yellow)

Welcome to the **Gribbit Backend**, a RESTful API powering a Reddit inspired news platform. Built with **Node.js** and **Express**, this project connects to a **PostgreSQL** database to serve articles, comments, and user data through a clean, efficient set of endpoints. Whether you’re here to explore the code or spin up your own instance, this README has you covered!

## Live Demo
Try the hosted version: [Gribbit News API](https://news-q339.onrender.com)
You can access the frontend here: https://gribbit.netlify.app/

## Frontend Repo
https://github.com/MrVolcano/gribbit_fe

## Project Overview
This backend delivers a fully-functional API for a news application, featuring:
- **Articles**: Fetch, filter, and sort news articles.
- **Comments**: Add and manage user comments.
- **Users**: Retrieve user profiles and their interactions.
- **Endpoints**: Robust CRUD operations for a seamless frontend experience.

Powered by **Express** and raw **PostgreSQL** queries, it’s lightweight, fast, and ready to integrate with your frontend of choice.

## Getting Started

Follow these steps to clone, configure, and run the project locally.

### Prerequisites
- **Node.js**: Minimum version **20.0.0** (tested up to 23.5.0)
- **PostgreSQL**: Minimum version **15.0** (tested up to 16.8)

Verify your versions with:
```bash
node -v
psql --version


### Installation

#### Clone the Repository

```bash
git clone https://github.com/MrVolcano/news.git
cd news
```

#### Install Dependencies

```bash
npm install
```

This pulls in Express and other required packages.

#### Set Up Environment Variables

Create two `.env` files in the project root for development and test environments:

**.env.development**

```plaintext
PGDATABASE=nc_news
```

**.env.test**

```plaintext
PGDATABASE=nc_news_test
```

Ensure these files are in `.gitignore` to keep them private!

#### Create Databases

Run the setup script to create the databases:

```bash
npm run setup-dbs
```

#### Seed the Database

For development:

```bash
npm run seed-prod
```

For testing:

```bash
npm run seed-test
```

#### Run the Application

Start the server:

```bash
npm start
```

Access the API at [http://localhost:2131/api](http://localhost:2131/api). Hit the /api endpoint to see a list of available routes!

### Running Tests

Run the test suite with Jest and Supertest:

```bash
npm test
```

This tests the API against the nc_news_test database.

## Configuration Details

- **Development**: Uses `.env.development` with `PGDATABASE=nc_news`.
- **Testing**: Uses `.env.test` with `PGDATABASE=nc_news_test`.
- **Production**: The hosted version runs with a production database (see live demo).
- **Seeding**: Use `npm run seed-prod` for production-like data or `npm run seed-test` for test data.

## Contributing

Fork the repo, play with the endpoints, and submit PRs or issues! I’d love to hear how you use it.

## License

Licensed under the MIT License—see [LICENSE](LICENSE) for details.

```

Feel free to modify links and details where necessary!
```
