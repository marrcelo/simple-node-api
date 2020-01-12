const express = require('express');
const mongoose = require('mongoose');
const vehicleRouter = require('./routers/vehicle.router');
const uri = require('./uri');

const app = express();
app.use(express.json());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.listen(3000, () => console.log(`Server is running... on http://localhost:3000/`));

app.use(vehicleRouter);

app.get('/', async (req, res) => {
  try {
    res.send('Server ON');
  } catch (err) {
    res.status(500).send(err);
  }
});
