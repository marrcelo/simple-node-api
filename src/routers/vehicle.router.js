const express = require('express');
const {
  create,
  deleteVehicle,
  find,
  findByPlate,
  update,
  addReview,
  reviewByPlate,
  reviewByBrand
} = require('../controllers/vehicle.controller');

const app = express();

app.get('/vehicles', async (req, res) => find(req, res));
app.get('/vehicle/:plate', async (req, res) => findByPlate(req, res));
app.post('/vehicle', async (req, res) => create(req, res));
app.patch('/vehicle/:plate', async (req, res) => update(req, res));
app.delete('/vehicle/:plate', async (req, res) => deleteVehicle(req, res));

app.get('/vehicles/review/:brand', async (req, res) => reviewByBrand(req, res));

app.get('/vehicle/review/:plate', async (req, res) => reviewByPlate(req, res));
app.patch('/vehicle/review/:plate', async (req, res) => addReview(req, res));

module.exports = app;
