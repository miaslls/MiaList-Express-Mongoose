import * as service from './category.service.js';

// 📌 POST

export const createCategory = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    const categByName = await service.findByName(reqBody.name, loggedUser._id);
    if (categByName) return res.status(400).send({ message: 'CATEGORY NOT UNIQUE' });

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

// 📌 PATCH

export const updateCategory = async (req, res) => {
  try {
    const loggedUser = req.user;
    const categId = req.params.id;
    const body = req.body;

    const categToUpdate = await service.findById(categId);
    if (!categToUpdate) return res.status(404).send({ message: 'NOT FOUND' });

    const categUserId = categToUpdate.user.toString();
    if (categUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const categByName = await service.findByName(body.name, loggedUser._id);

    if (categByName) {
      if (categToUpdate.name !== body.name) return res.status(400).send({ message: 'CATEGORY NOT UNIQUE' });
    }

    const category = await service.update(categId, body);

    res.send(category);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 DELETE

export const removeCategory = async (req, res) => {
  try {
    const loggedUser = req.user;
    const categId = req.params.id;

    const categToRemove = await service.findById(categId);
    if (!categToRemove) return res.status(404).send({ message: 'NOT FOUND' });

    const categUserId = categToRemove.user.toString();
    if (categUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    if (categToRemove.lists.length > 0) return res.status(405).send({ message: 'CATEGORY NON-EMPTY' });

    const category = await service.remove(categId);

    res.send(category);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
