const Vehicle = require('../models/vehicle.model');
const { checkPlateFormat } = require('./vehicle.controller.util');

const find = async (req, res) => {
  const { brand, color } = req.query;
  const query = {};
  if (!!brand) query['brand'] = brand;
  if (!!color) query['color'] = color;

  const vehicles = await Vehicle.find(query);

  try {
    res.send(vehicles);
  } catch (err) {
    res.status(500).send(err);
  }
};

const create = async (req, res) => {
  const { plate } = req.body;
  checkPlateFormat(res, plate);

  const vehicle = new Vehicle(req.body);
  try {
    await vehicle.save({ validateBeforeSave: true });
    res.send(vehicle);
  } catch (err) {
    res.status(500).send(err);
  }
};

const update = async (req, res) => {
  const { plate } = req.params;
  checkPlateFormat(res, plate);

  try {
    const vehicle = await Vehicle.findOneAndUpdate({ plate }, req.body);
    if (!vehicle) res.status(404).send(`Vehicle with plate ${plate} don't found.`);

    res.send(vehicle);
  } catch (err) {
    res.status(500).send(err);
  }
};

const findByPlate = async (req, res) => {
  const { plate } = req.params;
  checkPlateFormat(res, plate);

  const vehicle = await Vehicle.findOne({ plate });
  if (!vehicle) res.status(404).send(`Vehicle with plate ${plate} don't found.`);
  res.send(vehicle);
};

const deleteVehicle = async (req, res) => {
  const { plate } = req.params;
  checkPlateFormat(res, plate);

  try {
    const vehicle = await Vehicle.findOneAndDelete({ plate });
    if (!vehicle) res.status(404).send(`Vehicle with plate ${plate} don't found.`);

    res.status(200).send(`Vehicle with plate ${plate} deleted.`);
  } catch (err) {
    res.status(500).send(err);
  }
};

const addReview = async (req, res) => {
  const { plate } = req.params;
  checkPlateFormat(res, plate);

  try {
    const vehicle = await Vehicle.findOne({ plate });
    if (!vehicle) res.status(404).send(`Vehicle with plate ${plate} don't found.`);

    vehicle.reviews.push(req.body);
    const updatedVehicle = await vehicle.save();
    res.send(updatedVehicle);
  } catch (err) {
    res.status(500).send(err);
  }
};

const reviewByPlate = async (req, res) => {
  const { plate } = req.params;
  checkPlateFormat(res, plate);

  try {
    const vehicle = await Vehicle.findOne({ plate });
    if (!vehicle) res.status(404).send(`Vehicle with plate ${plate} don't found.`);

    const totalPrice = vehicle.reviews.reduce((acc, curr) => (acc += curr.price), 0);

    res.send({ plate, totalPrice });
  } catch (err) {
    res.status(500).send(err);
  }
};

const reviewByBrand = async (req, res) => {
  const { brand } = req.params;
  if (!brand) return res.status(400).send(`Brand value is required.`);
  try {
    const result = await Vehicle.aggregate([
      {
        $match: { brand: brand }
      },
      { $unwind: '$reviews' },
      {
        $group: {
          _id: '$brand',
          paidTotal: { $sum: '$reviews.price' }
        }
      }
    ]);

    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  addReview,
  find,
  create,
  findByPlate,
  deleteVehicle,
  update,
  reviewByPlate,
  reviewByBrand
};
