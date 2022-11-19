import * as service from './list.service.js';

// 📌 POST

export const createList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const listByTitle = await service.findByTitle(reqBody.title, loggedUser._id);
    if (listByTitle) return res.status(400).send({ message: 'LIST NOT UNIQUE' });

    // TODO: add to category

    const body = { ...reqBody, user: loggedUser._id };
    const list = await service.create(body);

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

    console.log(listByTitle?.title, body.title, listUserId, loggedUser._id); // 🐞

    if (listByTitle) {
      console.log(listToUpdate.title !== body.title); // 🐞
      if (listToUpdate.title !== body.title) return res.status(400).send({ message: 'CATEGORY NOT UNIQUE' });
    }

    // TODO: if ('category' in body) add/remove from category

    const list = await service.update(listId, body);

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
