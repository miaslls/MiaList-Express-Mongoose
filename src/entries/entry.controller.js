import * as service from './entry.service.js';

// 📌 POST

export const createEntry = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const duplicateEntry = await service.findDuplicate(reqBody.list, reqBody.text);
    if (duplicateEntry) return res.status(400).send({ message: 'DUPLICATE ENTRY' });

    const body = { ...reqBody, user: loggedUser._id };
    const entry = await service.create(body);

    res.send(entry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL) by user

export const findAllEntriesByUser = async (req, res) => {
  try {
    const loggedUser = req.user;
    const entries = await service.findAllByUser(loggedUser._id);

    res.send(entries);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 PATCH

export const updateEntry = async (req, res) => {
  try {
    const loggedUser = req.user;
    const entryId = req.params.id;
    const body = req.body;

    const entryToUpdate = await service.findById(entryId);
    if (!entryToUpdate) return res.status(404).send({ message: 'ENTRY NOT FOUND' });

    const entryUserId = entryToUpdate.user.toString();
    if (entryUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const duplicateEntry = await service.findDuplicate(body.list, body.text);

    if (duplicateEntry) {
      if (entryToUpdate.text !== body.text) return res.status(400).send({ message: 'DUPLICATE ENTRY' });
    }

    const entry = await service.update(entryId, body);

    res.send(entry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 DELETE

export const removeEntry = async (req, res) => {
  try {
    const loggedUser = req.user;
    const entryId = req.params.id;

    const entryToRemove = await service.findById(entryId);
    if (!entryToRemove) return res.status(404).send({ message: 'ENTRY NOT FOUND' });

    const entryUserId = entryToRemove.user.toString();
    if (entryUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const entry = await service.remove(entryId);

    res.send(entry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
