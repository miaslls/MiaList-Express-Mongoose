import * as userService from '../../users/user.service.js';

export const addProfileToUser = async (user, profile) => {
  const userToUpdate = await userService.findById(user);
  if (!userToUpdate) return res.status(404).send({ message: 'USER NOT FOUND' });

  if (!userToUpdate.profiles.includes(profile)) {
    userToUpdate.profiles.push(profile);
  }

  const userBody = { profiles: userToUpdate.profiles };
  await userService.update(user, userBody);
};
