import mongoose from 'mongoose';

export const validateBody_post = (req, res, next) => {
  const { list, text } = req.body;

  if (!list || !text) return res.status(400).send({ message: 'INCOMPLETE DATA' });
  if (!mongoose.Types.ObjectId.isValid(list)) return res.status(400).send({ message: 'LIST INVALID' });

  next();
};

export const validateBody_patch = (req, res, next) => {
  const body = req.body;

  const checkForNonEmptyBody = 'text' in body || 'starred' in body;
  if (!checkForNonEmptyBody) {
    return res.status(400).send({ message: 'NO DATA' });
  }

  next();
};
