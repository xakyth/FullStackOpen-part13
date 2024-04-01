const express = require('express');
const { PORT } = require('./util/config');
const app = express();
const { connectToDatabase } = require('./util/db');
const blogsRouter = require('./controllers/blogs');

app.use(express.json());
app.use('/api/blogs', blogsRouter);

const main = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();
