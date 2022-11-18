import * as service from './category.service.js';

// 📌 CREATE

export const createCategory = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    // TODO: validate reqBody (middleware)
    // TODO: validate unique categ name

    const body = { ...reqBody, user: loggedUser._id };
    const category = await service.create(body);

    res.send(category);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 GET (ALL) by user

export const findAllCategoriesByUser = async (req, res) => {
  try {
    const loggedUser = req.user;
    const categories = await service.findAllByUser(loggedUser._id);

    res.send(categories);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
