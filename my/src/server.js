import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db.js';
import app from './app.js';
import { env } from './config/env.js';
async function start() {
  await connectDB();
  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
}
start();
