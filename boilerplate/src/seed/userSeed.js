import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { env } from '../config/env.js';
import User from '../models/User.js';
import { USER_ROLES } from '../constants/index.js';
(async () => {
  try {
    await connectDB();
    const exists = await User.findOne({ email: env.adminSeed.email });
    if (exists) {
      console.log('Admin already exists');
    } else {
      await User.create({
        name: env.adminSeed.name,
        email: env.adminSeed.email,
        password: env.adminSeed.password,
        role: USER_ROLES.ADMIN
      });
      console.log('Admin user created');
    }
    await mongoose.disconnect();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
