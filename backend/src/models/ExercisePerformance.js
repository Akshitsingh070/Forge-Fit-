import mongoose from 'mongoose';

const exercisePerformanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    exerciseName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    weightKg: { type: Number, required: true },
    reps: { type: Number, required: true },
    estimatedOneRepMax: { type: Number, required: true }, // Epley formula: weight * (1 + reps/30)
    totalVolumeKg: { type: Number, default: 0 },
    rpe: { type: Number, default: 8 },
    isPersonalRecord: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const ExercisePerformance =
  mongoose.models.ExercisePerformance ||
  mongoose.model('ExercisePerformance', exercisePerformanceSchema);
