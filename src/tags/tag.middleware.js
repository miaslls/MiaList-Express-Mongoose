const mongoose = require('mongoose');

const validateBody_post = (req, res, next) => {
  const { name } = req.body;

  if (!name) return res.status(400).send({ message: 'NO DATA' });

  next();
};

const validateBody_patch = (req, res, next) => {
  const { tagId } = req.params;
  const { name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(tagId)) return res.status(400).send({ message: 'ID INVALID' });
  if (!name) return res.status(400).send({ message: 'NO DATA' });

  next();
};

module.exports = { validateBody: validateBody_post };
