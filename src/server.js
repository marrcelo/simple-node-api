const express = require('express');
const mongoose = require('mongoose');
const uri = require('./uri');
const vehicleRouter = require('./routers/vehicle.router');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

const app = express();
app.use(express.json());
app.use(vehicleRouter);

app.get('/', async (req, res) => {
  try {
    res.send('Server ON');
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log(`Server is running... on http://localhost:3000/`));
