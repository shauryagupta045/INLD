const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
}

function isAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  next();
}

module.exports = { auth, isAdmin };
const express = require('express');
const router = express.Router();    