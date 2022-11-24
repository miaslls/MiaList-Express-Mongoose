const service = require('./entry.service');
const { addEntryToList, removeEntryFromList } = require('./util/manageLists');

// 📌 POST

const createEntry = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const duplicateEntry = await service.findDuplicate(reqBody.list, reqBody.text);
    if (duplicateEntry) return res.status(400).send({ message: 'DUPLICATE ENTRY' });

    const now = new Date();
    const body = { ...reqBody, user: loggedUser._id, createdAt: now };
    const entry = await service.create(body);

    addEntryToList(entry.list, entry._id);

    res.send(entry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL) by user

const findAllEntriesByUser = async (req, res) => {
  try {
    const loggedUser = req.user;
    const entries = await service.findAllByUser(loggedUser._id);

    res.send(entries);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 PATCH

const updateEntry = async (req, res) => {
  try {
    const loggedUser = req.user;
    const entryId = req.params.entryId;
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

const removeEntry = async (req, res) => {
  try {
    const loggedUser = req.user;
    const entryId = req.params.entryId;

    const entryToRemove = await service.findById(entryId);
    if (!entryToRemove) return res.status(404).send({ message: 'ENTRY NOT FOUND' });

    const entryUserId = entryToRemove.user.toString();
    if (entryUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const entry = await service.remove(entryId);

    removeEntryFromList(entryToRemove.list.toString(), entryId);

    res.send(entry);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createEntry, findAllEntriesByUser, updateEntry, removeEntry };
