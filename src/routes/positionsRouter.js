const express = require('express');
const positionController = require('../controllers/positionController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/:id')
  .get(positionController.getPosition)
  .patch(positionController.updatePosition)
  .delete(positionController.deletePosition);

router
  .route('/')
  .post(positionController.createPosition)
  .get(
    authController.restrictTo('admin'),
    positionController.getAllPositions
  );

module.exports = router;
