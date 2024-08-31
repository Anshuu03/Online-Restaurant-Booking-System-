const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Get all reservations
router.get('/', reservationController.getReservations);

// Create a new reservation
router.post('/', reservationController.createReservation);

module.exports = router;
