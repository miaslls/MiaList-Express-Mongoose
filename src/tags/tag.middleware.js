export const validateBody = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ message: 'NO DATA' });
  }

  next();
};
