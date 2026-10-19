import mongoose from 'mongoose';

const setLogSchema = new mongoose.Schema({
  setNumber: { type: Number, required: true },
  targetReps: { type: String },
  weightKg: { type: Number, default: 0 },
  repsCompleted: { type: Number, default: 0 },
  rpe: { type: Number, min: 1, max: 10, default: 8 },
  isCompleted: { type: Boolean, default: false },
  restSecondsTaken: { type: Number, default: 90 },
});

const exerciseSessionSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  name: { type: String, required: true },
  primaryMuscle: { type: String },
  sets: [setLogSchema],
  isCompleted: { type: Boolean, default: false },
  notes: { type: String, default: '' },
});

const workoutSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    workoutTitle: { type: String, required: true },
    dayName: { type: String, required: true },
    focus: { type: String },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    durationSeconds: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['in_progress', 'completed', 'cancelled'],
      default: 'in_progress',
    },
    exercises: [exerciseSessionSchema],
    totalSetsCompleted: { type: Number, default: 0 },
    totalVolumeKg: { type: Number, default: 0 },
    averageRpe: { type: Number, default: 7 },
    userFeedback: {
      feeling: {
        type: String,
        enum: ['great', 'good', 'moderate', 'exhausted', 'injured'],
        default: 'good',
      },
      difficultyRating: { type: Number, min: 1, max: 5, default: 3 },
      notes: { type: String, default: '' },
    },
    adaptiveInsights: [
      {
        message: { type: String },
        metric: { type: String },
        suggestion: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export const WorkoutSession =
  mongoose.models.WorkoutSession ||
  mongoose.model('WorkoutSession', workoutSessionSchema);
