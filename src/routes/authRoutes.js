const express = require('express');
const { register, login, logout, protected, getData } = require('../controllers/authController');
const authenticateToken = require('../middleware/authenticateToken');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/data', getData);
router.get('/protected', authenticateToken, protected);

module.exports = router;
