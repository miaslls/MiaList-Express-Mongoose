export const validateBody_post = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).send({ message: 'INCOMPLETE DATA' });
  if (password.length < 8) return res.status(400).send({ message: 'PASSWORD INVALID' });

  next();
};

export const validateBody_patch = (req, res, next) => {
  const body = req.body;

  if (body?.password.length < 8) return res.status(400).send({ message: 'PASSWORD INVALID' });

  // TODO: validate auth type

  next();
};
