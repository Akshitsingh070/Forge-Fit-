import mongoose from 'mongoose';

const fitnessAssessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Goals
    primaryGoal: {
      type: String,
      required: true,
      enum: [
        'build_muscle',
        'lose_fat',
        'gain_strength',
        'improve_fitness',
        'improve_endurance',
        'body_recomposition',
        'general_health',
      ],
    },
    secondaryGoals: [
      {
        type: String,
      },
    ],

    // Experience
    experienceLevel: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
    },
    trainingHistoryYears: { type: Number, default: 0 },
    currentDaysPerWeek: { type: Number, default: 0 },

    // Training availability
    daysPerWeekAvailable: { type: Number, required: true, min: 2, max: 7 },
    workoutDuration: {
      type: String,
      required: true,
      enum: ['20-30 min', '30-45 min', '45-60 min', '60-90 min', '90+ min'],
    },
    preferredTrainingDays: [{ type: String }],
    preferredWorkoutTime: {
      type: String,
      enum: ['early_morning', 'morning', 'afternoon', 'evening', 'night'],
      default: 'morning',
    },

    // Equipment
    availableEquipment: [
      {
        type: String,
        enum: [
          'full_gym',
          'dumbbells',
          'barbell',
          'machines',
          'resistance_bands',
          'cable_machine',
          'home_gym',
          'bodyweight_only',
        ],
      },
    ],

    // Lifestyle
    dailyActivityLevel: {
      type: String,
      enum: ['sedentary', 'light', 'moderate', 'very_active'],
      default: 'moderate',
    },
    averageSleepHours: { type: Number, default: 7 },
    stressLevel: {
      type: String,
      enum: ['low', 'moderate', 'high'],
      default: 'moderate',
    },
    occupationType: { type: String, default: 'desk' },

    // Preferences
    preferredWorkoutStyle: {
      type: String,
      enum: ['push_pull_legs', 'upper_lower', 'full_body', 'bro_split', 'custom'],
      default: 'push_pull_legs',
    },
    targetMuscleGroups: [{ type: String }],
    enjoyedExercises: [{ type: String }],
    dislikedExercises: [{ type: String }],

    // Limitations
    hasInjuries: { type: Boolean, default: false },
    injuriesDescription: { type: String, default: '' },
    movementRestrictions: [{ type: String }],
    exercisesToAvoid: [{ type: String }],
    disclaimerAcknowledged: { type: Boolean, required: true, default: true },

    status: {
      type: String,
      enum: ['draft', 'completed', 'active'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export const FitnessAssessment =
  mongoose.models.FitnessAssessment ||
  mongoose.model('FitnessAssessment', fitnessAssessmentSchema);
