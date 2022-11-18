import bcrypt from 'bcryptjs';

import { getUser, generateToken } from './auth.service.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await getUser(username);
    if (!user) {
      return res.status(400).send({ message: 'invalid login info' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({ message: 'invalid login info' });
    }

    const payload = {
      _id: user._id,
      username: user.username,
      isAdmin: user.isAdmin,
    };

    const token = generateToken(payload);
    res.send({ token, user: payload });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export default login;
