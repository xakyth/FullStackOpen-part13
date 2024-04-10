const express = require('express');
require('express-async-errors');
const { PORT } = require('./util/config');
const app = express();
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const logoutRouter = require('./controllers/logout');
const authorRouter = require('./controllers/authors');
const readinglistsRouter = require('./controllers/readinglists');

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/authors', authorRouter);
app.use('/api/readinglists', readinglistsRouter);

const errorHandler = (error, req, res, next) => {
  res.status(400).send({ error: error.errors.map((e) => e.message) });
};
app.use(errorHandler);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
