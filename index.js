const express = require('express');
require('express-async-errors');
const { PORT } = require('./util/config');
const app = express();
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');

app.use(express.json());
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);

const errorHandler = (error, req, res, next) => {
  res.status(400).send({ error });
};
app.use(errorHandler);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
