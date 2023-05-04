// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../models/user');
const invalidTokens = require('../store/invalidTokens'); // Add this line

exports.signup = async (req, res) => {
  // Hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 8);
  console.log(`Hashed password length: ${hashedPassword.length}`);

  // Insert the user into the database
  connection.query(
    'INSERT INTO users (email, password, username) VALUES (?,?,?)',
    [req.body.email, hashedPassword,req.body.username],
    (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }
      res.status(201).send({ message: 'User registered successfully' });
    }
  );
};

exports.login = (req, res) => {
  // Find the user in the database
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [req.body.email],
    async (error, results) => {
      if (error) {
        return res.status(500).send(error);
      }

      if (results.length === 0) {
        return res.status(404).send({ message: 'User not found' });
      }

      const user = results[0];

      // Check the password
      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
        return res.status(401).send({ message: 'Invalid password' });
      }

      // Generate and send the JWT
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 // expires in 24 hours
      });

      res.status(200).send({ token });
    }
  );
};

exports.logout = (req, res) => {
  const token = req.headers['x-access-token'];

  // Add token to invalidated tokens
  invalidTokens.push(token);

  res.status(200).send({ message: 'Logged out successfully' });
};
