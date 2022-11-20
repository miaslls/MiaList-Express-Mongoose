import * as service from './entry.service.js';

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
