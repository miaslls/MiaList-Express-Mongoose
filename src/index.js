const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const databaseConnection = require('./database/dbConnection');

const authRoute = require('./auth/auth.route');
const userRoute = require('./users/user.route');
const profileRoute = require('./profiles/profile.route');

// import tagRoute from './tags/tag.route.js';
// import listRoute from './lists/list.route.js';
// import entryRoute from './entries/entry.route.js';

const authorize = require('./middleware/authorize');

const app = express();
const port = process.env.PORT || 3001;

databaseConnection();

app.use(cors());
app.use(express.json());

app.use('/login', authRoute);
app.use('/user', userRoute);
app.use('/profile', authorize, profileRoute);
// app.use('/tag', authorize, tagRoute);
// app.use('/list', authorize, listRoute);
// app.use('/entry', authorize, entryRoute);

app.listen(port, () => {
  console.log(`server running @ port ${port}`);
});
