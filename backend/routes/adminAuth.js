const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Fixed admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// Admin login endpoint
router.post('/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if credentials match fixed admin credentials
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
            // Generate JWT token
            const token = jwt.sign(
                { username: ADMIN_CREDENTIALS.username, role: 'admin' },
                process.env.JWT_SECRET || 'your-secret-key-change-this',
                { expiresIn: '24h' }
            );

            res.json({
                success: true,
                token,
                message: 'Admin login successful'
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// Admin authentication middleware
const authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-this');
        if (decoded.role === 'admin') {
            req.admin = decoded;
            next();
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Protected admin route example
router.get('/admin/dashboard', authenticateAdmin, (req, res) => {
    res.json({ 
        success: true, 
        message: 'Welcome to admin dashboard', 
        admin: req.admin.username 
    });
});

// Get all registrations (protected route)
router.get('/admin/registrations', authenticateAdmin, async (req, res) => {
    try {
        const Registration = require('../models/Registration');
        const registrations = await Registration.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            data: registrations
        });
    } catch (error) {
        console.error('Error fetching registrations:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching registrations'
        });
    }
});

module.exports = { router, authenticateAdmin };
