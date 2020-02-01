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

const router = express.Router();

router.get('/vehicles', async (req, res) => find(req, res));

router.get('/vehicle/:plate', async (req, res) => findByPlate(req, res));
router.post('/vehicle', async (req, res) => create(req, res));
router.patch('/vehicle/:plate', async (req, res) => update(req, res));
router.delete('/vehicle/:plate', async (req, res) => deleteVehicle(req, res));

router.get('/vehicles/review/:brand', async (req, res) => reviewByBrand(req, res));

router.get('/vehicle/review/:plate', async (req, res) => reviewByPlate(req, res));
router.patch('/vehicle/review/:plate', async (req, res) => addReview(req, res));

module.exports = router;
