import * as service from './list.service.js';

import { addListToCateg, removeListFromCateg } from './util/manageCategories.js';

// 📌 POST

export const createList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const listByTitle = await service.findByTitle(reqBody.title, loggedUser._id);
    if (listByTitle) return res.status(400).send({ message: 'LIST NOT UNIQUE' });

    const body = { ...reqBody, user: loggedUser._id };
    const list = await service.create(body);

    addListToCateg(list.category, list._id);

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL) by user

export const findAllListsByUser = async (req, res) => {
  try {
    const loggedUser = req.user;
    const lists = await service.findAllByUser(loggedUser._id);

    res.send(lists);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 PATCH

export const updateList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const listId = req.params.id;
    const body = req.body;

    const listToUpdate = await service.findById(listId);
    if (!listToUpdate) return res.status(404).send({ message: 'LIST NOT FOUND' });

    const listUserId = listToUpdate.user.toString();
    if (listUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const listByTitle = await service.findByTitle(body.title, loggedUser._id);

    if (listByTitle) {
      if (listToUpdate.title !== body.title) return res.status(400).send({ message: 'LIST NOT UNIQUE' });
    }

    const list = await service.update(listId, body);

    if ('category' in body) {
      addListToCateg(body.category, listId);
      removeListFromCateg(listToUpdate.category.toString(), listId);
    }

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 DELETE

export const removeList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const listId = req.params.id;

    const listToRemove = await service.findById(listId);
    if (!listToRemove) return res.status(404).send({ message: 'LIST NOT FOUND' });

    const listUserId = listToRemove.user.toString();
    if (listUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const list = await service.remove(listId);

    removeListFromCateg(listToRemove.category.toString(), listId);

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
