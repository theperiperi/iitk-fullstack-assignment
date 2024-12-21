const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { generateSummary } = require('../services/aiService');

// Create new post
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Generate AI summary
    const summary = await generateSummary(content);
    
    const post = new Post({
      title,
      content,
      summary
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error creating post',
      error: error.message 
    });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .select('title summary createdAt'); // Only send necessary fields for list
    res.json(posts);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching posts',
      error: error.message 
    });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching post',
      error: error.message 
    });
  }
});

// Update post
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    
    // Generate new summary if content changed
    const summary = await generateSummary(content);
    
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { 
        title, 
        content, 
        summary,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating post',
      error: error.message 
    });
  }
});

// Delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error deleting post',
      error: error.message 
    });
  }
});

module.exports = router; 