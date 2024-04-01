const express = require('express');
require('express-async-errors');
const { PORT } = require('./util/config');
const app = express();
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');

app.use(express.json());
app.use('/api/blogs', blogsRouter);

const errorHandler = (error, req, res, next) => {
  res.status(400).send({ error: error.message });
};
app.use(errorHandler);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
