import mongoose from 'mongoose';
import { USER_ROLES, STATUS } from '../constants/index.js';
import { hashPassword, comparePassword } from '../utils/password.js';
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(USER_ROLES), default: USER_ROLES.USER },
    status: { type: String, enum: Object.values(STATUS), default: STATUS.ACTIVE }
  },
  { timestamps: true }
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await hashPassword(this.password);
  next();
});
userSchema.methods.comparePassword = function (plain) {
  return comparePassword(plain, this.password);
};
const User = mongoose.model('User', userSchema);
export default User;
