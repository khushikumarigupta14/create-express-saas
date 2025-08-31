import User from '../models/User.js';
export const userRepository = {
  create: (data) => User.create(data),
  findByEmail: (email) => User.findOne({ email }).select('+password'),
  findById: (id) => User.findById(id),
  findAll: (filter = {}, projection = '-password') => User.find(filter, projection),
};
