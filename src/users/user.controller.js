import * as service from './user.service.js';

export const findAllUsers = async (req, res) => {
  try {
    const users = await service.findAll();

    if (!users) {
      return res.status(404).send({ message: 'NOT FOUND' });
    }

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
