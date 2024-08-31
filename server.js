const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/myDatabase';
mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Define Reservation model
const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  message: String
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// Define routes
app.post('/api/reservations', (req, res) => {
  console.log(req.body);  // Log the request body to see what is being sent
  const newReservation = new Reservation(req.body);
  newReservation.save()
    .then(reservation => res.status(201).send(reservation))
    .catch(err => res.status(400).send(err));
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 2099;
app.listen(PORT, () => console.log(`Server running on port ${2099}`));
