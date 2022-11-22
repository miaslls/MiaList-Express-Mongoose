const mongoose = require('mongoose');

const validate_id = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: 'ID INVALID' });
  }

  next();
};

module.exports = validate_id;
