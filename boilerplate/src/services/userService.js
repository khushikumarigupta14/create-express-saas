import { userRepository } from '../repository/userRepository.js';
export const userService = {
  list: () => userRepository.findAll(),
  get: (id) => userRepository.findById(id)
};
