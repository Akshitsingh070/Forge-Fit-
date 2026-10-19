import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { seedExercises } from '../data/seedExercises.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../storage_cache.json');

// In-memory collections
let db = {
  users: [],
  userProfiles: [],
  fitnessAssessments: [],
  workoutPlans: [],
  workouts: [],
  exercises: [...seedExercises],
  workoutSessions: [],
  exercisePerformances: [],
  progressMeasurements: [],
  goals: [],
  recommendations: [],
};

// Save to disk cache
const persistCache = () => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (e) {
    // Silent fail if write restricted
  }
};

// Load from disk cache
const loadCache = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(data);
      db = { ...db, ...parsed };
      // Always guarantee exercises exist
      if (!db.exercises || db.exercises.length === 0) {
        db.exercises = [...seedExercises];
      }
    }
  } catch (e) {
    console.warn('[Storage] Could not read storage cache, using memory state.');
  }
};

export const initStorage = async () => {
  loadCache();

  // Seed demo user if no users exist
  if (db.users.length === 0) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const demoUser = {
      _id: 'user_demo_101',
      id: 'user_demo_101',
      name: 'Alex Mercer',
      email: 'demo@forgefit.ai',
      password: hashedPassword,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      createdAt: new Date().toISOString(),
    };
    db.users.push(demoUser);

    const demoProfile = {
      _id: 'prof_demo_101',
      id: 'prof_demo_101',
      userId: demoUser.id,
      age: 28,
      gender: 'male',
      height: 180,
      weight: 78.5,
      targetWeight: 82,
      unitPreference: 'metric',
      activityLevel: 'moderate',
      occupationType: 'desk',
      averageSleepHours: 7.5,
      stressLevel: 'moderate',
      streakDays: 4,
      lastWorkoutDate: new Date(Date.now() - 86400000).toISOString(),
      totalWorkoutsCompleted: 14,
    };
    db.userProfiles.push(demoProfile);

    const demoAssessment = {
      _id: 'assess_demo_101',
      id: 'assess_demo_101',
      userId: demoUser.id,
      primaryGoal: 'build_muscle',
      secondaryGoals: ['gain_strength', 'improve_fitness'],
      experienceLevel: 'intermediate',
      trainingHistoryYears: 2,
      currentDaysPerWeek: 4,
      daysPerWeekAvailable: 4,
      workoutDuration: '45-60 min',
      preferredTrainingDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      preferredWorkoutTime: 'morning',
      availableEquipment: ['full_gym', 'barbell', 'dumbbell', 'cable_machine', 'machines'],
      dailyActivityLevel: 'moderate',
      averageSleepHours: 7.5,
      stressLevel: 'moderate',
      occupationType: 'desk',
      preferredWorkoutStyle: 'push_pull_legs',
      targetMuscleGroups: ['Chest', 'Back', 'Shoulders', 'Legs'],
      enjoyedExercises: ['Barbell Flat Bench Press', 'Conventional Barbell Deadlift'],
      dislikedExercises: ['Burpees'],
      hasInjuries: false,
      injuriesDescription: '',
      movementRestrictions: [],
      exercisesToAvoid: [],
      disclaimerAcknowledged: true,
      status: 'active',
      createdAt: new Date().toISOString(),
    };
    db.fitnessAssessments.push(demoAssessment);

    // Initial 8-week plan for demo
    const demoPlan = {
      _id: 'plan_demo_101',
      id: 'plan_demo_101',
      userId: demoUser.id,
      programName: 'Hypertrophy Forge: 8-Week Progressive Muscle & Density Architecture',
      description: 'An intelligent 4-day hybrid Push/Pull/Legs/Upper split engineered for maximum mechanical tension, progressive overload, and systematic deloading.',
      goal: 'build_muscle',
      experienceLevel: 'intermediate',
      weeklyFrequency: 4,
      estimatedSessionDurationMinutes: 55,
      durationWeeks: 8,
      currentWeek: 2,
      splitType: 'push_pull_legs',
      schedule: [
        { dayOfWeek: 'Monday', isRestDay: false, workoutTitle: 'Push Day A — Chest, Delts & Triceps', focus: 'Upper Body Pressing & Mid Deltoid Density', workoutIndex: 0 },
        { dayOfWeek: 'Tuesday', isRestDay: false, workoutTitle: 'Pull Day A — Lat Width & Spinal Thickness', focus: 'Vertical / Horizontal Pulling & Bicep Peak', workoutIndex: 1 },
        { dayOfWeek: 'Wednesday', isRestDay: true, workoutTitle: 'Active Recovery & Mobility', focus: 'Joint decompression, light walking & hydration', workoutIndex: -1 },
        { dayOfWeek: 'Thursday', isRestDay: false, workoutTitle: 'Leg Day — Quad & Glute Hypertrophy', focus: 'Knee extension, hinge loading & posterior chain', workoutIndex: 2 },
        { dayOfWeek: 'Friday', isRestDay: false, workoutTitle: 'Upper Body Density & Weak Point Overload', focus: 'High metabolic fatigue & hypertrophy finishers', workoutIndex: 3 },
        { dayOfWeek: 'Saturday', isRestDay: true, workoutTitle: 'Cardio & Recovery Protocol', focus: 'Zone 2 cardio or full rest', workoutIndex: -1 },
        { dayOfWeek: 'Sunday', isRestDay: true, workoutTitle: 'Full Rest & Weekly Macro Reset', focus: 'Sleep optimization & meal planning', workoutIndex: -1 },
      ],
      workouts: [
        {
          id: 'w-0',
          dayName: 'Monday',
          title: 'Push Day A — Chest, Delts & Triceps',
          focus: 'Upper Body Pressing & Mid Deltoid Density',
          isRestDay: false,
          estimatedDurationMinutes: 55,
          muscleGroups: ['Chest', 'Shoulders', 'Triceps'],
          warmUp: ['5 min dynamic shoulder arm circles & band dislocates', '2 sets push-ups x 10', '1 warmup set barbell bench with empty bar x 12'],
          coolDown: ['Crossover chest stretch 60s', 'Overhead triceps stretch 45s per side'],
          exercises: [
            {
              exerciseId: 'ex-bench-press',
              name: 'Barbell Flat Bench Press',
              category: 'Chest',
              primaryMuscle: 'Pectoralis Major',
              equipment: 'barbell',
              targetSets: 4,
              targetReps: '6-8',
              restSeconds: 120,
              tempo: '3-1-1-0',
              rpeTarget: 8,
              recommendedWeightKg: 75,
              instructions: seedExercises[0].instructions,
              safetyNotes: seedExercises[0].safetyNotes,
              alternatives: seedExercises[0].alternatives,
            },
            {
              exerciseId: 'ex-incline-db-press',
              name: 'Incline Dumbbell Press',
              category: 'Chest',
              primaryMuscle: 'Clavicular Pectoral (Upper Chest)',
              equipment: 'dumbbell',
              targetSets: 3,
              targetReps: '8-12',
              restSeconds: 90,
              tempo: '3-0-1-0',
              rpeTarget: 8.5,
              recommendedWeightKg: 26,
              instructions: seedExercises[1].instructions,
              safetyNotes: seedExercises[1].safetyNotes,
              alternatives: seedExercises[1].alternatives,
            },
            {
              exerciseId: 'ex-db-lateral-raise',
              name: 'Dumbbell Lateral Raise',
              category: 'Shoulders',
              primaryMuscle: 'Lateral Deltoid',
              equipment: 'dumbbell',
              targetSets: 4,
              targetReps: '12-15',
              restSeconds: 60,
              tempo: '3-0-1-1',
              rpeTarget: 9,
              recommendedWeightKg: 10,
              instructions: seedExercises[7].instructions,
              safetyNotes: seedExercises[7].safetyNotes,
              alternatives: seedExercises[7].alternatives,
            },
            {
              exerciseId: 'ex-tricep-rope-pushdown',
              name: 'Cable Tricep Rope Pushdown',
              category: 'Triceps',
              primaryMuscle: 'Triceps Brachii',
              equipment: 'cable',
              targetSets: 3,
              targetReps: '12-14',
              restSeconds: 60,
              tempo: '3-0-1-1',
              rpeTarget: 9,
              recommendedWeightKg: 27.5,
              instructions: seedExercises[15].instructions,
              safetyNotes: seedExercises[15].safetyNotes,
              alternatives: seedExercises[15].alternatives,
            },
          ]
        },
        {
          id: 'w-1',
          dayName: 'Tuesday',
          title: 'Pull Day A — Lat Width & Spinal Thickness',
          focus: 'Vertical / Horizontal Pulling & Bicep Peak',
          isRestDay: false,
          estimatedDurationMinutes: 50,
          muscleGroups: ['Back', 'Biceps', 'Rear Delts'],
          warmUp: ['Scapular pull-ups 2 sets x 8', 'Band pull-aparts x 20'],
          coolDown: ['Child pose lat stretch 60s', 'Doorway bicep stretch 30s'],
          exercises: [
            {
              exerciseId: 'ex-lat-pulldown',
              name: 'Wide-Grip Lat Pulldown',
              category: 'Back',
              primaryMuscle: 'Latissimus Dorsi',
              equipment: 'cable',
              targetSets: 4,
              targetReps: '8-10',
              restSeconds: 90,
              tempo: '3-0-1-1',
              rpeTarget: 8,
              recommendedWeightKg: 65,
              instructions: seedExercises[4].instructions,
              safetyNotes: seedExercises[4].safetyNotes,
              alternatives: seedExercises[4].alternatives,
            },
            {
              exerciseId: 'ex-seated-cable-row',
              name: 'Seated Cable Row',
              category: 'Back',
              primaryMuscle: 'Rhomboids & Mid Traps',
              equipment: 'cable',
              targetSets: 3,
              targetReps: '10-12',
              restSeconds: 75,
              tempo: '3-0-1-1',
              rpeTarget: 8.5,
              recommendedWeightKg: 55,
              instructions: seedExercises[5].instructions,
              safetyNotes: seedExercises[5].safetyNotes,
              alternatives: seedExercises[5].alternatives,
            },
            {
              exerciseId: 'ex-face-pull',
              name: 'Cable Face Pull',
              category: 'Shoulders',
              primaryMuscle: 'Posterior Deltoid',
              equipment: 'cable',
              targetSets: 3,
              targetReps: '15-20',
              restSeconds: 60,
              tempo: '2-2-1-1',
              rpeTarget: 8,
              recommendedWeightKg: 20,
              instructions: seedExercises[8].instructions,
              safetyNotes: seedExercises[8].safetyNotes,
              alternatives: seedExercises[8].alternatives,
            },
            {
              exerciseId: 'ex-barbell-curl',
              name: 'Standing Barbell Bicep Curl',
              category: 'Biceps',
              primaryMuscle: 'Biceps Brachii',
              equipment: 'barbell',
              targetSets: 3,
              targetReps: '8-10',
              restSeconds: 75,
              tempo: '3-0-1-1',
              rpeTarget: 8.5,
              recommendedWeightKg: 30,
              instructions: seedExercises[13].instructions,
              safetyNotes: seedExercises[13].safetyNotes,
              alternatives: seedExercises[13].alternatives,
            },
          ]
        },
        {
          id: 'w-2',
          dayName: 'Thursday',
          title: 'Leg Day — Quad & Glute Hypertrophy',
          focus: 'Knee extension, hinge loading & posterior chain',
          isRestDay: false,
          estimatedDurationMinutes: 60,
          muscleGroups: ['Legs', 'Glutes', 'Calves'],
          warmUp: ['Deep bodyweight squats 2x15', 'Leg swings front-to-back & side-to-side'],
          coolDown: ['Kneeling hip flexor stretch 60s', 'Standing quad stretch 45s'],
          exercises: [
            {
              exerciseId: 'ex-barbell-squat',
              name: 'Barbell Back Squat',
              category: 'Legs',
              primaryMuscle: 'Quadriceps Femoris',
              equipment: 'barbell',
              targetSets: 4,
              targetReps: '6-8',
              restSeconds: 150,
              tempo: '3-1-1-0',
              rpeTarget: 8.5,
              recommendedWeightKg: 95,
              instructions: seedExercises[9].instructions,
              safetyNotes: seedExercises[9].safetyNotes,
              alternatives: seedExercises[9].alternatives,
            },
            {
              exerciseId: 'ex-romanian-deadlift',
              name: 'Barbell Romanian Deadlift (RDL)',
              category: 'Legs',
              primaryMuscle: 'Hamstrings & Gluteus Maximus',
              equipment: 'barbell',
              targetSets: 3,
              targetReps: '8-10',
              restSeconds: 90,
              tempo: '3-1-1-0',
              rpeTarget: 8,
              recommendedWeightKg: 80,
              instructions: seedExercises[10].instructions,
              safetyNotes: seedExercises[10].safetyNotes,
              alternatives: seedExercises[10].alternatives,
            },
            {
              exerciseId: 'ex-walking-lunges',
              name: 'Dumbbell Walking Lunges',
              category: 'Legs',
              primaryMuscle: 'Quadriceps & Gluteus Maximus',
              equipment: 'dumbbell',
              targetSets: 3,
              targetReps: '10-12 per leg',
              restSeconds: 90,
              tempo: '2-0-1-0',
              rpeTarget: 8.5,
              recommendedWeightKg: 18,
              instructions: seedExercises[11].instructions,
              safetyNotes: seedExercises[11].safetyNotes,
              alternatives: seedExercises[11].alternatives,
            },
            {
              exerciseId: 'ex-standing-calf-raise',
              name: 'Standing Calf Raise',
              category: 'Calves',
              primaryMuscle: 'Gastrocnemius',
              equipment: 'machine',
              targetSets: 4,
              targetReps: '12-15',
              restSeconds: 60,
              tempo: '3-2-1-0',
              rpeTarget: 9,
              recommendedWeightKg: 60,
              instructions: seedExercises[19].instructions,
              safetyNotes: seedExercises[19].safetyNotes,
              alternatives: seedExercises[19].alternatives,
            },
          ]
        },
        {
          id: 'w-3',
          dayName: 'Friday',
          title: 'Upper Body Density & Weak Point Overload',
          focus: 'High metabolic fatigue & hypertrophy finishers',
          isRestDay: false,
          estimatedDurationMinutes: 50,
          muscleGroups: ['Chest', 'Back', 'Shoulders', 'Arms'],
          warmUp: ['Arm swings', 'Band pull aparts x 25'],
          coolDown: ['Full upper body static stretching'],
          exercises: [
            {
              exerciseId: 'ex-overhead-press',
              name: 'Standing Barbell Overhead Press',
              category: 'Shoulders',
              primaryMuscle: 'Anterior & Lateral Deltoid',
              equipment: 'barbell',
              targetSets: 4,
              targetReps: '6-8',
              restSeconds: 120,
              tempo: '2-1-1-0',
              rpeTarget: 8.5,
              recommendedWeightKg: 45,
              instructions: seedExercises[6].instructions,
              safetyNotes: seedExercises[6].safetyNotes,
              alternatives: seedExercises[6].alternatives,
            },
            {
              exerciseId: 'ex-cable-crossover',
              name: 'Cable Chest Fly',
              category: 'Chest',
              primaryMuscle: 'Sternal Pectoralis',
              equipment: 'cable',
              targetSets: 3,
              targetReps: '12-15',
              restSeconds: 60,
              tempo: '2-1-1-1',
              rpeTarget: 9,
              recommendedWeightKg: 15,
              instructions: seedExercises[2].instructions,
              safetyNotes: seedExercises[2].safetyNotes,
              alternatives: seedExercises[2].alternatives,
            },
            {
              exerciseId: 'ex-db-hammer-curl',
              name: 'Dumbbell Hammer Curl',
              category: 'Biceps',
              primaryMuscle: 'Brachialis',
              equipment: 'dumbbell',
              targetSets: 3,
              targetReps: '10-12',
              restSeconds: 60,
              tempo: '2-0-1-1',
              rpeTarget: 8.5,
              recommendedWeightKg: 14,
              instructions: seedExercises[14].instructions,
              safetyNotes: seedExercises[14].safetyNotes,
              alternatives: seedExercises[14].alternatives,
            },
            {
              exerciseId: 'ex-skull-crushers',
              name: 'EZ-Bar Lying Triceps Extension (Skull Crushers)',
              category: 'Triceps',
              primaryMuscle: 'Triceps Brachii (Long Head)',
              equipment: 'barbell',
              targetSets: 3,
              targetReps: '8-12',
              restSeconds: 75,
              tempo: '3-1-1-0',
              rpeTarget: 8.5,
              recommendedWeightKg: 28,
              instructions: seedExercises[16].instructions,
              safetyNotes: seedExercises[16].safetyNotes,
              alternatives: seedExercises[16].alternatives,
            },
          ]
        }
      ],
      progressionStrategy: 'Double Progression Model: when upper rep boundary (e.g. 8 reps across all sets) is cleared cleanly at RPE <= 8, increase load by 2.5 kg on compound lifts next session.',
      status: 'active',
      aiGenerated: true,
      aiModelUsed: 'ForgeFit Bio-Adaptive Neural Engine',
      createdAt: new Date().toISOString(),
    };
    db.workoutPlans.push(demoPlan);

    // Initial Progress & Performance metrics
    db.progressMeasurements.push(
      {
        id: 'pm-1',
        userId: demoUser.id,
        date: new Date(Date.now() - 30 * 86400000).toISOString(),
        weightKg: 76.5,
        bodyFatPercentage: 16.2,
        bmi: 23.6,
        measurements: { chestCm: 102, waistCm: 84, armsCm: 36, thighsCm: 57 },
      },
      {
        id: 'pm-2',
        userId: demoUser.id,
        date: new Date(Date.now() - 15 * 86400000).toISOString(),
        weightKg: 77.4,
        bodyFatPercentage: 15.8,
        bmi: 23.9,
        measurements: { chestCm: 103, waistCm: 83.5, armsCm: 36.5, thighsCm: 57.5 },
      },
      {
        id: 'pm-3',
        userId: demoUser.id,
        date: new Date().toISOString(),
        weightKg: 78.5,
        bodyFatPercentage: 15.4,
        bmi: 24.2,
        measurements: { chestCm: 104.5, waistCm: 83, armsCm: 37.2, thighsCm: 58.2 },
      }
    );

    // Exercise performance historical entries
    db.exercisePerformances.push(
      { id: 'ep-1', userId: demoUser.id, exerciseName: 'Barbell Flat Bench Press', date: new Date(Date.now() - 14 * 86400000).toISOString(), weightKg: 70, reps: 8, estimatedOneRepMax: 88.6, totalVolumeKg: 1680, rpe: 8 },
      { id: 'ep-2', userId: demoUser.id, exerciseName: 'Barbell Flat Bench Press', date: new Date(Date.now() - 7 * 86400000).toISOString(), weightKg: 72.5, reps: 8, estimatedOneRepMax: 91.8, totalVolumeKg: 1740, rpe: 8 },
      { id: 'ep-3', userId: demoUser.id, exerciseName: 'Barbell Flat Bench Press', date: new Date(Date.now() - 2 * 86400000).toISOString(), weightKg: 75, reps: 8, estimatedOneRepMax: 95.0, totalVolumeKg: 1800, rpe: 8, isPersonalRecord: true },
      { id: 'ep-4', userId: demoUser.id, exerciseName: 'Barbell Back Squat', date: new Date(Date.now() - 10 * 86400000).toISOString(), weightKg: 90, reps: 6, estimatedOneRepMax: 108.0, totalVolumeKg: 2160, rpe: 8.5 },
      { id: 'ep-5', userId: demoUser.id, exerciseName: 'Barbell Back Squat', date: new Date(Date.now() - 3 * 86400000).toISOString(), weightKg: 95, reps: 6, estimatedOneRepMax: 114.0, totalVolumeKg: 2280, rpe: 8.5, isPersonalRecord: true },
      { id: 'ep-6', userId: demoUser.id, exerciseName: 'Conventional Barbell Deadlift', date: new Date(Date.now() - 12 * 86400000).toISOString(), weightKg: 120, reps: 5, estimatedOneRepMax: 140.0, totalVolumeKg: 1800, rpe: 8 }
    );

    // Goals
    db.goals.push(
      { id: 'g-1', userId: demoUser.id, title: 'Achieve 82 kg Lean Mass', type: 'weight', targetMetric: 'weightKg', currentValue: 78.5, targetValue: 82.0, unit: 'kg', isCompleted: false, progressPercentage: 65 },
      { id: 'g-2', userId: demoUser.id, title: '100 kg Bench Press 1RM', type: 'strength', targetMetric: 'benchPress1RM', currentValue: 95.0, targetValue: 100.0, unit: 'kg', isCompleted: false, progressPercentage: 90 },
      { id: 'g-3', userId: demoUser.id, title: '4 Workouts / Week Streak', type: 'consistency', targetMetric: 'weeklyWorkouts', currentValue: 4, targetValue: 4, unit: 'sessions', isCompleted: true, progressPercentage: 100 }
    );

    // Dynamic initial recommendations
    db.recommendations.push(
      {
        id: 'rec-1',
        userId: demoUser.id,
        title: "Today's workout is ready: Push Day A",
        description: "Focus on clavicular chest engagement and strict tempo. Warm up rotator cuffs with external rotations before starting.",
        category: 'next_action',
        priority: 'high',
        actionLabel: 'Launch Workout Player',
        actionRoute: '/dashboard/workout',
        isRead: false,
        isDismissed: false,
      },
      {
        id: 'rec-2',
        userId: demoUser.id,
        title: "Overload Trigger: Bench Press Progression",
        description: "Your Barbell Bench Press performance has improved across 3 consecutive sessions at RPE 8. Consider adding +2.5 kg on your top sets today.",
        category: 'progression',
        priority: 'medium',
        actionLabel: 'View Strength Curve',
        actionRoute: '/dashboard/progress',
        isRead: false,
        isDismissed: false,
      },
      {
        id: 'rec-3',
        userId: demoUser.id,
        title: "Pre-Workout Fueling Reminder",
        description: "Target 30-40g fast-digesting carbohydrates and 500ml water 45 minutes before training for optimal glycogen saturation.",
        category: 'nutrition',
        priority: 'low',
        actionLabel: 'View Nutrition Targets',
        actionRoute: '/dashboard/nutrition',
        isRead: false,
        isDismissed: false,
      }
    );

    persistCache();
  }
};

// Generic storage accessor methods
export const Storage = {
  getCollection: (name) => db[name] || [],
  
  findById: (collection, id) => {
    return (db[collection] || []).find((item) => item.id === id || item._id === id);
  },
  
  findOne: (collection, queryFn) => {
    return (db[collection] || []).find(queryFn);
  },

  find: (collection, queryFn) => {
    if (!queryFn) return db[collection] || [];
    return (db[collection] || []).filter(queryFn);
  },

  create: (collection, data) => {
    if (!db[collection]) db[collection] = [];
    const id = data.id || data._id || `item_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    const newItem = {
      ...data,
      _id: id,
      id: id,
      createdAt: data.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db[collection].push(newItem);
    persistCache();
    return newItem;
  },

  updateOne: (collection, queryFn, updateData) => {
    if (!db[collection]) return null;
    const index = db[collection].findIndex(queryFn);
    if (index === -1) return null;
    db[collection][index] = {
      ...db[collection][index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    persistCache();
    return db[collection][index];
  },

  deleteOne: (collection, queryFn) => {
    if (!db[collection]) return false;
    const index = db[collection].findIndex(queryFn);
    if (index === -1) return false;
    db[collection].splice(index, 1);
    persistCache();
    return true;
  },
};
