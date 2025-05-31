# NC News Seeding

Set up environment variables so your app connects to the correct databases.
You must create two .env files for your databases:

.env.test (for the test database).
.env.development (for the development database).

Run setup and seed commands:

npm run setup-dbs Creates nc_news and nc_news_test databases
npm run seed-dev Seeds the development database
npm run test-seed Seeds the test database and runs tests
