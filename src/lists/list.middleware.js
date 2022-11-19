import mongoose from 'mongoose';

export const validateBody_post = (req, res, next) => {
  const { title, icon, category } = req.body;

  if (!title || !icon || !category) return res.status(400).send({ message: 'INCOMPLETE DATA' });
  if (!mongoose.Types.ObjectId.isValid(category)) return res.status(400).send({ message: 'CATEGORY INVALID' });

  next();
};

export const validateBody_patch = (req, res, next) => {
  const body = req.body;

  const checkForNonEmptyBody = 'title' in body || 'icon' in body || 'category' in body || 'pinned' in body;
  if (!checkForNonEmptyBody) {
    return res.status(400).send({ message: 'NO DATA' });
  }

  if ('category' in body) {
    if (!mongoose.Types.ObjectId.isValid(body.category)) return res.status(400).send({ message: 'CATEGORY INVALID' });
  }

  next();
};
