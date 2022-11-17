import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import databaseConnection from './database/dbConnection.js';

const app = express();
const port = process.env.PORT || 3001;

databaseConnection();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`server running @ port ${port}`);
});
