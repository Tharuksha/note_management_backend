const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');

// POST /api/auth/signup
exports.signup = async (req, res, next) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) return res.status(400).json({ message: 'User already exists' });
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, config.jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/profile
exports.getProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    res.json(req.user);
  } catch (error) {
    next(error);
  }
};