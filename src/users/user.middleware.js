const validateBody_post = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).send({ message: 'INCOMPLETE DATA' });
  if (password.length < 8) return res.status(400).send({ message: 'PASSWORD INVALID' });

  next();
};

const validateBody_patch = (req, res, next) => {
  const { username, password, isAdmin } = req.body;
  if (!username && !password && !isAdmin) return res.status(400).send({ message: 'NO DATA' });
  if (password) if (body.password.length < 8) return res.status(400).send({ message: 'PASSWORD INVALID' });

  next();
};

module.exports = { validateBody_post, validateBody_patch };
