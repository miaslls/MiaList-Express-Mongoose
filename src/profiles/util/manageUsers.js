const userService = require('../../users/user.service');

const addProfileToUser = async (user, profile) => {
  const userToUpdate = await userService.findById(user);
  if (!userToUpdate) return res.status(404).send({ message: 'USER NOT FOUND' });

  if (!userToUpdate.profiles.includes(profile)) {
    userToUpdate.profiles.push(profile);
  }

  const userBody = { profiles: userToUpdate.profiles };
  await userService.update(user, userBody);
};

const removeProfileFromUser = async (user, profile) => {
  const userToUpdate = await userService.findById(user);
  if (!userToUpdate) return res.status(404).send({ message: 'USER NOT FOUND' });

  const userToUpdate_ProfileIds = [];

  userToUpdate.profiles.forEach((profile) => userToUpdate_ProfileIds.push(profile.toString()));

  const removedProfileIndex = userToUpdate_ProfileIds.indexOf(profile);
  userToUpdate_ProfileIds.splice(removedProfileIndex, 1);

  const userBody = { profiles: userToUpdate_ProfileIds };
  await userService.update(user, userBody);
};

module.exports = { addProfileToUser, removeProfileFromUser };
