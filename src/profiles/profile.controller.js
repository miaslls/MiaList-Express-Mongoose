import * as service from './profile.service.js';

import { addProfileToUser } from './util/manageUsers.js';

// 📌 POST

export const createProfile = async (req, res) => {
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

export const findAllProfilesByUser = async (req, res) => {
  try {
    const loggedUser = req.user;
    const profiles = await service.findAllByUser(loggedUser._id);

    res.send(profiles);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
