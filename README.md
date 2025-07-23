# NC News

A link to the hosted version - https://nc-news-api-zobh.onrender.com.
Northcoders News API provides access to news articles, topics, users, and comments via a RESTful API. Built with Node.js, Express, and PostgreSQL, this API allows clients to fetch, filter, create, update, and delete resources relevant to a news application.
The API interacts with a seeded PostgreSQL database (nc_news and nc_news_test) using node-postgres. It supports features such as:

Fetching all topics and users
Retrieving single articles with comment counts
Paginated and sortable article lists with topic filtering
Posting and deleting comments
Updating article votes

Clone the repository:
git clone https://github.com/InnaLiu07/nc-news-backend-Inna.git
cd northcoders-news-be

Install dependencies:
npm install

Run setup and seed commands:

npm run setup-dbs # Creates nc_news and nc_news_test databases
npm run seed-dev # Seeds the development database
npm run test-seed # Seeds the test database and runs tests

Set up environment variables so your app connects to the correct databases.
You must create two .env files for your databases in the root directory:

.env.test (for the test database):
PGDATABASE=nc_news_test

.env.development (for the development database):
PGDATABASE=nc_news

Running the app
npm start

Running tests
npm test

The minimum versions of Node.js, and Postgres needed to run the project:
Node.js: v16 or higher
PostgreSQL: v12 or higher
