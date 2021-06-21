const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewsController.getMain);
router.get('/sign', viewsController.getSign);
router.get('/404', viewsController.getError);
router.get('/resetPassword/:token', authController.resetPasswordForm);

router.get('/home', authController.protect, viewsController.getHome);

module.exports = router;
