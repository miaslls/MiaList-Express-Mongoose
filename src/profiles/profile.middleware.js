const validateBody_post = (req, res, next) => {
  const { name, icon } = req.body;

  if (!name || !icon) {
    return res.status(400).send({ message: 'INCOMPLETE DATA' });
  }

  next();
};

const validateBody_patch = (req, res, next) => {
  const { name, icon } = req.body;

  if (!name && !icon) {
    return res.status(400).send({ message: 'NO DATA' });
  }

  next();
};

module.exports = { validateBody_post, validateBody_patch };
