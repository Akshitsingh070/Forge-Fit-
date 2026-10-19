import mongoose from 'mongoose';

const workoutPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    programName: { type: String, required: true },
    description: { type: String },
    goal: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    weeklyFrequency: { type: Number, required: true },
    estimatedSessionDurationMinutes: { type: Number, default: 50 },
    durationWeeks: { type: Number, default: 8 },
    currentWeek: { type: Number, default: 1 },
    splitType: { type: String, required: true },
    schedule: [
      {
        dayOfWeek: { type: String, required: true }, // Monday, Tuesday, ...
        isRestDay: { type: Boolean, default: false },
        workoutTitle: { type: String },
        focus: { type: String },
        workoutIndex: { type: Number },
      },
    ],
    workouts: [
      {
        dayName: { type: String },
        title: { type: String },
        focus: { type: String },
        isRestDay: { type: Boolean, default: false },
        estimatedDurationMinutes: { type: Number },
        muscleGroups: [{ type: String }],
        warmUp: [{ type: String }],
        coolDown: [{ type: String }],
        exercises: [
          {
            exerciseId: { type: String },
            name: { type: String },
            category: { type: String },
            primaryMuscle: { type: String },
            equipment: { type: String },
            targetSets: { type: Number },
            targetReps: { type: String },
            restSeconds: { type: Number },
            tempo: { type: String },
            rpeTarget: { type: Number },
            recommendedWeightKg: { type: Number },
            instructions: [{ type: String }],
            safetyNotes: [{ type: String }],
            alternatives: [
              {
                name: { type: String },
                equipment: { type: String },
                reason: { type: String },
              },
            ],
          },
        ],
      },
    ],
    progressionStrategy: { type: String },
    status: {
      type: String,
      enum: ['active', 'paused', 'completed', 'archived'],
      default: 'active',
    },
    aiGenerated: { type: Boolean, default: true },
    aiModelUsed: { type: String, default: 'ForgeFit Bio-Adaptive Neural Engine' },
  },
  { timestamps: true }
);

export const WorkoutPlan =
  mongoose.models.WorkoutPlan ||
  mongoose.model('WorkoutPlan', workoutPlanSchema);
