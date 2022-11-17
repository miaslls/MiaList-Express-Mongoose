import * as service from './user.service.js';

// 📌 POST

export const createUser = async (req, res) => {
  try {
    const body = req.body;

    const userByUsername = await service.findByUsername(body.username);
    console.log(userByUsername); // 🐞
    if (userByUsername) return res.status(400).send({ message: 'USERNAME TAKEN' });

    const user = await service.create(body);

    const { _id, username, isAdmin } = user;

    res.status(201).send({ _id, username, isAdmin });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL)

export const findAllUsers = async (req, res) => {
  try {
    const users = await service.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 UPDATE

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const userById = await service.findById(id);
    if (!userById) return res.status(404).send({ message: 'NOT FOUND' });

    if (body.username) {
      const userByUsername = await service.findByUsername(body.username);
      if (userByUsername) return res.status(400).send({ message: 'USERNAME TAKEN' });
    }

    const user = await service.update(id, body);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 REMOVE

export const removeUser = async (req, res) => {
  try {
    const id = req.params.id;

    const userById = await service.findById(id);
    if (!userById) return res.status(404).send({ message: 'NOT FOUND' });

    const user = await service.remove(id);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
