
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define schema for Arduino data
const arduinoDataSchema = new mongoose.Schema({
  vibrationDuration: Number,
  latitude: Number,
  longitude: Number
});
const ArduinoData = mongoose.model('ArduinoData', arduinoDataSchema);

app.use(bodyParser.json());

// Route to handle Arduino data
app.post('/data', (req, res) => {
  const { vibrationDuration, latitude, longitude } = req.body;

  const arduinoData = new ArduinoData({
    vibrationDuration,
    latitude,
    longitude
  });

  arduinoData.save()
    .then(() => {
      console.log('Data saved to MongoDB:', arduinoData);
      res.sendStatus(200);
    })
    .catch(error => {
      console.error('Error saving data to MongoDB:', error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Node.js server listening on port ${PORT}`);
});
