import * as service from './list.service.js';
import * as categService from '../categories/category.service.js';

// 📌 POST

export const createList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const listByTitle = await service.findByTitle(reqBody.title, loggedUser._id);
    if (listByTitle) return res.status(400).send({ message: 'LIST NOT UNIQUE' });

    const body = { ...reqBody, user: loggedUser._id };
    const list = await service.create(body);

    // findCategById -> categ exists ✔ -> categ belongs to loggedUser ✔ -> add list to categ.lists ✔

    const categToUpdate = await categService.findById(reqBody.category);
    if (!categToUpdate) return res.status(404).send({ message: 'CATEGORY NOT FOUND' });

    const categUserId = categToUpdate.user.toString();
    if (categUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    if (!categToUpdate.lists.includes(list._id)) {
      categToUpdate.lists.push(list._id);
    }

    const categBody = { lists: categToUpdate.lists };
    await categService.update(categToUpdate._id, categBody);

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
    if (!listToUpdate) return res.status(404).send({ message: 'NOT FOUND' });

    const listUserId = listToUpdate.user.toString();
    if (listUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const listByTitle = await service.findByTitle(body.title, loggedUser._id);

    if (listByTitle) {
      if (listToUpdate.title !== body.title) return res.status(400).send({ message: 'LIST NOT UNIQUE' });
    }

    // TODO: if ('category' in body) add/remove from category

    const list = await service.update(listId, body);

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
    if (!listToRemove) return res.status(404).send({ message: 'NOT FOUND' });

    const listUserId = listToRemove.user.toString();
    if (listUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    // TODO: remove from category

    const list = await service.remove(listId);

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
