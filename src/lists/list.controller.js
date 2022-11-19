import * as service from './list.service.js';

// export const FUNCT = async (req, res) => {
//     try {} catch (err) {
//         res.status(500).send({ message: err.message });
//       }
// }

// 📌 POST

export const createList = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const listByTitle = await service.findByTitle(reqBody.title, loggedUser._id);
    if (listByTitle) return res.status(400).send({ message: 'LIST NOT UNIQUE' });

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
