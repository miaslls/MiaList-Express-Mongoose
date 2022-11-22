const jwt = require('jsonwebtoken');

const authorize = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: 'TOKEN NULL' });

  // ❤ RegExp by Phapha
  const [_, token] = /^Bearer (\S+)$/.exec(authHeader);

  if (!token) return res.status(401).send({ message: 'HEADER INVALID' });

  jwt.verify(token, process.env.SECRET, async (err, decoded) => {
    if (err) return res.status(401).send({ message: 'TOKEN INVALID' });

    req.user = decoded.user;

    next();
  });
};

module.exports = authorize;
