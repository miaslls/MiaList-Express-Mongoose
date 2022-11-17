import * as service from './user.service.js';

// 📌 POST

export const createUser = async (req, res) => {
  try {
    const body = req.body;

    const user = await service.create(body);

    const { _id, username, isAdmin } = user;

    res.status(201).send({ _id, username, isAdmin });
    // res.status(201).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL)

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
