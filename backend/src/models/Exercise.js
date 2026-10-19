import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Chest',
        'Back',
        'Shoulders',
        'Biceps',
        'Triceps',
        'Legs',
        'Glutes',
        'Core',
        'Calves',
        'Full Body',
        'Cardio',
      ],
    },
    primaryMuscle: { type: String, required: true },
    secondaryMuscles: [{ type: String }],
    equipment: {
      type: String,
      required: true,
      enum: [
        'barbell',
        'dumbbell',
        'machine',
        'cable',
        'bodyweight',
        'resistance_bands',
        'kettlebell',
        'cardio_machine',
      ],
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Intermediate',
    },
    instructions: [{ type: String }],
    defaultSets: { type: Number, default: 3 },
    defaultReps: { type: String, default: '8-12' },
    defaultRestSeconds: { type: Number, default: 90 },
    tempo: { type: String, default: '3-0-1-0' },
    safetyNotes: [{ type: String }],
    alternatives: [
      {
        name: { type: String },
        equipment: { type: String },
        reason: { type: String },
      },
    ],
    videoPlaceholderUrl: { type: String },
    imageUrl: { type: String },
    tips: [{ type: String }],
  },
  { timestamps: true }
);

export const Exercise =
  mongoose.models.Exercise || mongoose.model('Exercise', exerciseSchema);
