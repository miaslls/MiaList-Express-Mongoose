import * as service from './list.service.js';

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
