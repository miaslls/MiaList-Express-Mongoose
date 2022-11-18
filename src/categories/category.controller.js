import * as service from './category.service.js';

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
