const express = require('express');

const tourController = require(`../controllers/tourController`);
const router = express.Router();
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTour, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyplan);

router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.makeTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
