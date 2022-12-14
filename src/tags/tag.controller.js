const service = require('./tag.service');

const { addTagToProfile, removeTagFromProfile } = require('./util/manageProfiles');

// 📌 POST

const createTag = async (req, res) => {
  try {
    const loggedUser = req.user;
    const profileId = req.params.profileId;
    const reqBody = req.body;

    const tagByName = await service.findByName(reqBody.name, loggedUser._id, profileId);
    if (tagByName) return res.status(400).send({ message: 'DUPLICATE TAG' });

    const body = { ...reqBody, user: loggedUser._id, profile: profileId };
    const tag = await service.create(body);

    addTagToProfile(tag.profile, tag._id);

    res.send(tag);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL) by profile

const findAllTagsByProfile = async (req, res) => {
  try {
    const { profileId } = req.params;
    const tags = await service.findAllByProfile(profileId);

    res.send(tags);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 PATCH

const updateTag = async (req, res) => {
  try {
    const loggedUser = req.user;
    const profileId = req.params.profileId;
    const tagId = req.params.tagId;
    const body = req.body;

    const tagToUpdate = await service.findById(tagId);
    if (!tagToUpdate) return res.status(404).send({ message: 'TAG NOT FOUND' });

    const tagUserId = tagToUpdate.user.toString();
    if (tagUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const tagByName = await service.findByName(body.name, loggedUser._id, profileId);

    if (tagByName) {
      if (tagToUpdate.name !== body.name) return res.status(400).send({ message: 'DUPLICATE TAG' });
    }

    const tag = await service.update(tagId, body);

    res.send(tag);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 DELETE

const removeTag = async (req, res) => {
  try {
    const loggedUser = req.user;
    const profileId = req.params.profileId;
    const tagId = req.params.tagId;

    const tagToRemove = await service.findById(tagId);
    if (!tagToRemove) return res.status(404).send({ message: 'TAG NOT FOUND' });

    const tagUserId = tagToRemove.user.toString();
    if (tagUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    if (tagToRemove.lists.length > 0) return res.status(405).send({ message: 'TAG NON-EMPTY' });

    await removeTagFromProfile(profileId, tagId);
    const tag = await service.remove(tagId);

    res.send(tag);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createTag, findAllTagsByProfile, updateTag, removeTag };
