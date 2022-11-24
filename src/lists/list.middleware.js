const mongoose = require('mongoose');

const validateBody_post = (req, res, next) => {
  const { title, icon, tags } = req.body;

  if (!title || !icon || tags.length === 0) return res.status(400).send({ message: 'INCOMPLETE DATA' });

  tags.forEach((tag) => {
    if (!mongoose.Types.ObjectId.isValid(tag)) return res.status(400).send({ message: 'TAG INVALID' });
  });

  next();
};

const validateBody_patch = (req, res, next) => {
  const body = req.body;

  const checkForNonEmptyBody = 'title' in body || 'icon' in body || 'tags' in body || 'pinned' in body;
  if (!checkForNonEmptyBody) return res.status(400).send({ message: 'NO DATA' });

  if ('tags' in body) {
    body.tags.forEach((tag) => {
      if (!mongoose.Types.ObjectId.isValid(tag)) return res.status(400).send({ message: 'TAG INVALID' });
    });
  }

  next();
};

module.exports = { validateBody_post, validateBody_patch };
