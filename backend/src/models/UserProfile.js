import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    age: { type: Number, min: 13, max: 100 },
    gender: {
      type: String,
      enum: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
      default: 'prefer-not-to-say',
    },
    height: { type: Number }, // in cm
    weight: { type: Number }, // in kg
    targetWeight: { type: Number }, // in kg
    unitPreference: {
      type: String,
      enum: ['metric', 'imperial'],
      default: 'metric',
    },
    activityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'very_active', 'athlete'],
      default: 'moderate',
    },
    occupationType: {
      type: String,
      enum: ['desk', 'standing', 'physically_active', 'heavy_labor'],
      default: 'desk',
    },
    averageSleepHours: { type: Number, default: 7 },
    stressLevel: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      default: 'moderate',
    },
    streakDays: { type: Number, default: 0 },
    lastWorkoutDate: { type: Date },
    totalWorkoutsCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);
