import mongoose from 'mongoose';

const workoutExerciseItemSchema = new mongoose.Schema({
  exerciseId: { type: String, required: true },
  name: { type: String, required: true },
  category: { type: String },
  primaryMuscle: { type: String },
  equipment: { type: String },
  targetSets: { type: Number, default: 3 },
  targetReps: { type: String, default: '8-12' },
  restSeconds: { type: Number, default: 90 },
  tempo: { type: String, default: '3-0-1-0' },
  rpeTarget: { type: Number, default: 8 },
  recommendedWeightKg: { type: Number, default: 0 },
  instructions: [{ type: String }],
  safetyNotes: [{ type: String }],
  alternatives: [
    {
      name: { type: String },
      equipment: { type: String },
      reason: { type: String },
    },
  ],
});

const workoutSchema = new mongoose.Schema(
  {
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    dayNumber: { type: Number, required: true }, // 1 to 7
    dayName: { type: String, required: true }, // e.g., 'Monday'
    title: { type: String, required: true }, // e.g., 'Push Day A - Upper Chest & Triceps'
    focus: { type: String, required: true },
    isRestDay: { type: Boolean, default: false },
    estimatedDurationMinutes: { type: Number, default: 55 },
    muscleGroups: [{ type: String }],
    warmUp: [{ type: String }],
    coolDown: [{ type: String }],
    exercises: [workoutExerciseItemSchema],
    order: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Workout =
  mongoose.models.Workout || mongoose.model('Workout', workoutSchema);
