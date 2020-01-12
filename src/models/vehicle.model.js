const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  review_date: { type: Date, required: true },
  price: { type: Number, required: true }
});

const vehicleSchema = new mongoose.Schema(
  {
    plate: { type: String, required: true, trim: true, unique: true },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    manufacture_year: { type: Number, required: true },
    registration_date: { type: Date, required: true },
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

vehicleSchema.index({ plate: 1 });
vehicleSchema.index({ brand: 1 });
vehicleSchema.index({ color: 1 });

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
