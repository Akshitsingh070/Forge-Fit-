import { Storage } from '../services/storageService.js';

export const getProgress = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    // 1. Body Measurements History
    const measurements = Storage.find('progressMeasurements', (m) => m.userId === userId)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2. Strength History for key compound exercises
    const keyLifts = [
      'Barbell Flat Bench Press',
      'Barbell Back Squat',
      'Conventional Barbell Deadlift',
      'Standing Barbell Overhead Press',
      'Wide-Grip Lat Pulldown'
    ];

    const strengthCurves = {};
    keyLifts.forEach((liftName) => {
      const records = Storage.find('exercisePerformances', (p) => p.userId === userId && p.exerciseName === liftName)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      strengthCurves[liftName] = records.map((r) => ({
        date: r.date,
        weightKg: r.weightKg,
        reps: r.reps,
        estimated1RM: r.estimatedOneRepMax,
        isPR: r.isPersonalRecord || false,
      }));
    });

    // 3. Workout Aggregates
    const sessions = Storage.find('workoutSessions', (s) => s.userId === userId);
    const completedSessions = sessions.filter((s) => s.status === 'completed');
    const totalVolumeKg = completedSessions.reduce((acc, s) => acc + (s.totalVolumeKg || 0), 0);
    const totalDurationSeconds = completedSessions.reduce((acc, s) => acc + (s.durationSeconds || 0), 0);

    const profile = Storage.findOne('userProfiles', (p) => p.userId === userId) || {};
    const goals = Storage.find('goals', (g) => g.userId === userId);

    // Compute weekly compliance (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000);
    const workoutsThisWeek = completedSessions.filter((s) => new Date(s.completedAt || s.createdAt) >= sevenDaysAgo).length;

    res.json({
      success: true,
      metrics: {
        totalWorkouts: profile.totalWorkoutsCompleted || completedSessions.length,
        workoutsThisWeek,
        currentStreak: profile.streakDays || 0,
        totalVolumeKg: Math.round(totalVolumeKg),
        totalDurationMinutes: Math.round(totalDurationSeconds / 60),
        completionRate: 92, // %
      },
      measurements,
      strengthCurves,
      goals,
      currentStats: {
        weightKg: profile.weight,
        heightCm: profile.height,
        bmi: profile.weight && profile.height ? Math.round((profile.weight / Math.pow(profile.height / 100, 2)) * 10) / 10 : null,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logProgress = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const { weightKg, bodyFatPercentage, measurements, notes } = req.body;

    if (!weightKg) {
      return res.status(400).json({ success: false, message: 'Please provide at least a weight value.' });
    }

    const profile = Storage.findOne('userProfiles', (p) => p.userId === userId);
    const heightCm = profile?.height || 178;
    const bmi = Math.round((Number(weightKg) / Math.pow(heightCm / 100, 2)) * 10) / 10;

    const newLog = Storage.create('progressMeasurements', {
      userId,
      date: new Date().toISOString(),
      weightKg: Number(weightKg),
      bodyFatPercentage: bodyFatPercentage ? Number(bodyFatPercentage) : undefined,
      bmi,
      measurements: measurements || {},
      notes: notes || '',
    });

    // Update weight on userProfile
    Storage.updateOne('userProfiles', (p) => p.userId === userId, { weight: Number(weightKg) });

    res.status(201).json({
      success: true,
      measurement: newLog,
      message: 'Physical progress metric logged successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
