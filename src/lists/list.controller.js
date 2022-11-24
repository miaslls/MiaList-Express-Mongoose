const service = require('./list.service');
const { addListToTag, removeListFromTag } = require('./util/manageTags');

// 📌 POST

const createList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const profileId = req.params.profileId;
    const reqBody = req.body;

    const listByTitle = await service.findByTitle(reqBody.title, profileId);
    if (listByTitle) return res.status(400).send({ message: 'DUPLICATE LIST' });

    const now = new Date();
    const body = { ...reqBody, user: loggedUser._id, profile: profileId, createdAt: now };
    const list = await service.create(body);

    list.tags.forEach((tag) => addListToTag(tag, list._id));

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL) by profile

const findAllListsByProfile = async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const lists = await service.findAllByProfile(profileId);

    res.send(lists);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 PATCH

const updateList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const listId = req.params.listId;
    const body = req.body;

    const listToUpdate = await service.findById(listId);
    if (!listToUpdate) return res.status(404).send({ message: 'LIST NOT FOUND' });

    const listUserId = listToUpdate.user.toString();
    if (listUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const listByTitle = await service.findByTitle(body.title, loggedUser._id);

    if (listByTitle) {
      if (listToUpdate.title !== body.title) return res.status(400).send({ message: 'DUPLICATE LIST' });
    }

    const list = await service.update(listId, body);

    if ('tags' in body) {
      const listToUpdateTagStrings = [];

      listToUpdate.tags.forEach((tag) => listToUpdateTagStrings.push(tag._id.toString()));

      if (listToUpdateTagStrings !== body.tags) {
        const tagsAdded = body.tags.filter((tag) => !listToUpdateTagStrings.includes(tag));
        const tagsRemoved = listToUpdateTagStrings.filter((tag) => !body.tags.includes(tag));

        tagsAdded.forEach((tag) => addListToTag(tag, listId));
        tagsRemoved.forEach((tag) => removeListFromTag(tag, listId));
      }
    }

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 DELETE

const removeList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const listId = req.params.listId;

    const listToRemove = await service.findById(listId);
    if (!listToRemove) return res.status(404).send({ message: 'LIST NOT FOUND' });

    const listUserId = listToRemove.user.toString();
    if (listUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const list = await service.remove(listId);

    const listToRemoveTagStrings = [];

    listToRemove.tags.forEach((tag) => {
      listToRemoveTagStrings.push(tag._id.toString());
    });

    listToRemoveTagStrings.forEach((tag) => removeListFromTag(tag, listId));

    res.send(list);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createList, findAllListsByProfile, updateList, removeList };
