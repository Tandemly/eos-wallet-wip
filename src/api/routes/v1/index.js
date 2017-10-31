const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const accountRoutes = require('./account.route');
const blockRoutes = require('./block.route');
const transactionRoutes = require('./transaction.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

/**
 * EOS Collections endpoints
 */
router.use('/accounts', accountRoutes);
router.use('/blocks', blockRoutes);
router.use('/transactions', transactionRoutes);

module.exports = router;
