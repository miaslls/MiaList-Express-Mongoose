const service = require('./profile.service');
const { addProfileToUser } = require('./util/manageUsers');

// 📌 POST

const createProfile = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const profileByName = await service.findByName(reqBody.name, loggedUser._id);
    if (profileByName) return res.status(400).send({ message: 'DUPLICATE PROFILE' });

    const body = { ...reqBody, user: loggedUser._id };
    const profile = await service.create(body);

    addProfileToUser(profile.user, profile._id);

    res.send(profile);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL) by user

const findAllProfilesByUser = async (req, res) => {
  try {
    const loggedUser = req.user;
    const profiles = await service.findAllByUser(loggedUser._id);

    res.send(profiles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET by ID

const findProfileById = async (req, res) => {
  try {
    const profileId = req.params.profileId;

    const profile = await service.findById(profileId);

    res.send(profile);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 PATCH

const updateProfile = async (req, res) => {
  try {
    const loggedUser = req.user;
    const profileId = req.params.profileId;
    const body = req.body;

    const profileToUpdate = await service.findById(profileId);
    if (!profileToUpdate) return res.status(404).send({ message: 'PROFILE NOT FOUND' });

    const profileUserId = profileToUpdate.user.toString();
    if (profileUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const profileByName = await service.findByName(profileToUpdate.name, loggedUser._id);

    if (profileByName) {
      if (profileToUpdate.name !== body.name) return res.status(400).send({ message: 'DUPLICATE PROFILE' });
    }

    const profile = await service.update(profileId, body);

    res.send(profile);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { createProfile, findAllProfilesByUser, findProfileById, updateProfile };
