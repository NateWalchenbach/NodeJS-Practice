const express = require('express');
const fs = require('fs');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.param('id', tourController.checkId);

// Routes
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour);

module.exports = router;
