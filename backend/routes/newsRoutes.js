const express = require('express');
const News = require('../models/News');
const { auth, isAdmin } = require('../middleware/auth');
const router = express.Router();

// Get all news (public)
router.get('/', async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

// Add news (admin only)
router.post('/', auth, isAdmin, async (req, res) => {
  const news = new News(req.body);
  await news.save();
  res.status(201).json(news);
});

// Update news
router.put('/:id', auth, isAdmin, async (req, res) => {
  const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(news);
});

// Delete news
router.delete('/:id', auth, isAdmin, async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.json({ message: 'News deleted' });
});

module.exports = router;
