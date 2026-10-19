import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ['weight', 'strength', 'consistency', 'endurance', 'habit'],
      default: 'weight',
    },
    targetMetric: { type: String }, // e.g., 'weightKg', 'benchPress1RM', 'weeklyWorkouts'
    currentValue: { type: Number, default: 0 },
    targetValue: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    targetDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
    progressPercentage: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Goal = mongoose.models.Goal || mongoose.model('Goal', goalSchema);
