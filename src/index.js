const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const databaseConnection = require('./database/dbConnection');

const authRoute = require('./auth/auth.route');
const userRoute = require('./users/user.route');
const profileRoute = require('./profiles/profile.route');

const authorize = require('./middleware/authorize');

const app = express();
const port = process.env.PORT || 3001;

databaseConnection();

app.use(cors());
app.use(express.json());

app.use('/login', authRoute);
app.use('/user', userRoute);
app.use('/profile', authorize, profileRoute);

app.listen(port, () => {
  console.log(`server running @ port ${port}`);
});
