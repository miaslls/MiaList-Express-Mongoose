import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import databaseConnection from './database/dbConnection.js';

import authRoute from './auth/auth.route.js';
import userRoute from './users/user.route.js';
import categRoute from './categories/category.route.js';

import authorize from './middleware/authorize.js';

const app = express();
const port = process.env.PORT || 3001;

databaseConnection();

app.use(cors());
app.use(express.json());

app.use('/login', authRoute);
app.use('/user', userRoute);
app.use('/category', authorize, categRoute);

app.listen(port, () => {
  console.log(`server running @ port ${port}`);
});
