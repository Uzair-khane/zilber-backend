const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ error: 'Email ya password galat hai' });
  }
  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res.json({ token });
};