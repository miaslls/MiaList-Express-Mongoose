const bcrypt = require('bcryptjs');
const service = require('./user.service');

// 📌 POST

const createUser = async (req, res) => {
  try {
    const body = req.body;

    const userByUsername = await service.findByUsername(body.username);
    if (userByUsername) return res.status(400).send({ message: 'USERNAME TAKEN' });

    const user = await service.create(body);

    const { _id, username, isAdmin } = user;

    res.status(201).send({ _id, username, isAdmin });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL)

const findAllUsers = async (req, res) => {
  try {
    const loggedUser = req.user;
    if (!loggedUser.isAdmin) return res.status(403).send({ message: 'FORBIDDEN' });

    const users = await service.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 PATCH

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const loggedUser = req.user;

    if ('isAdmin' in body && !loggedUser.isAdmin) return res.status(403).send({ message: 'FORBIDDEN' });

    const userById = await service.findById(id);
    if (!userById) return res.status(404).send({ message: 'NOT FOUND' });

    if ('username' in body) {
      const userByUsername = await service.findByUsername(body.username);
      if (userByUsername) return res.status(400).send({ message: 'USERNAME TAKEN' });
    }

    if ('password' in body) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const user = await service.update(id, body);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 DELETE

const removeUser = async (req, res) => {
  try {
    const id = req.params.id;
    const loggedUser = req.user;

    if (!loggedUser.isAdmin) return res.status(403).send({ message: 'FORBIDDEN' });

    const userById = await service.findById(id);
    if (!userById) return res.status(404).send({ message: 'NOT FOUND' });

    const user = await service.remove(id);
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createUser, findAllUsers, updateUser, removeUser };
