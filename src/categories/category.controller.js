import * as service from './category.service.js';

// 📌 CREATE

export const createCategory = async (req, res) => {
  try {
    const loggedUser = req.user;
    const reqBody = req.body;

    // TODO: validate reqBody (middleware)

    const categByName = await service.findByName(reqBody.name);
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
    const categUserId = categToUpdate.user.toString();
    if (categUserId !== loggedUser._id) return res.status(403).send({ message: 'FORBIDDEN' });

    const categByName = await service.findByName(body.name);

    if (categByName) {
      if (categByName.name !== body.name) return res.status(400).send({ message: 'CATEGORY NOT UNIQUE' });
    }

    const category = await service.update(categId, body);

    res.send(category);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// 📌 DELETE
