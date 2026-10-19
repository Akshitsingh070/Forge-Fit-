import mongoose from 'mongoose';

const progressMeasurementSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: { type: Date, default: Date.now },
    weightKg: { type: Number, required: true },
    bodyFatPercentage: { type: Number },
    bmi: { type: Number },
    measurements: {
      chestCm: { type: Number },
      waistCm: { type: Number },
      hipsCm: { type: Number },
      armsCm: { type: Number },
      thighsCm: { type: Number },
      calvesCm: { type: Number },
      shouldersCm: { type: Number },
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

export const ProgressMeasurement =
  mongoose.models.ProgressMeasurement ||
  mongoose.model('ProgressMeasurement', progressMeasurementSchema);
