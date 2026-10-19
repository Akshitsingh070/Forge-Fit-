import { Storage } from '../services/storageService.js';

export const getTodayWorkout = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const plan = Storage.findOne('workoutPlans', (p) => p.userId === userId && p.status === 'active');

    if (!plan || !plan.workouts || plan.workouts.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No active workout plan found. Please complete the fitness assessment.',
      });
    }

    // Determine current day of week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDayName = days[new Date().getDay()];

    // Find schedule item for today
    const todaySchedule = (plan.schedule || []).find((s) => s.dayOfWeek === currentDayName);

    let targetWorkout = null;
    let isRestDay = false;

    if (todaySchedule && todaySchedule.isRestDay) {
      isRestDay = true;
    } else if (todaySchedule && todaySchedule.workoutIndex !== undefined && todaySchedule.workoutIndex >= 0) {
      targetWorkout = plan.workouts[todaySchedule.workoutIndex];
    }

    // If today is a rest day or not explicitly matched, get the next available training session
    if (!targetWorkout && !isRestDay) {
      targetWorkout = plan.workouts[0];
    }

    // Attach previous performance metrics for exercises in this workout
    let enrichedExercises = [];
    if (targetWorkout && targetWorkout.exercises) {
      enrichedExercises = targetWorkout.exercises.map((ex) => {
        const pastPerf = Storage.find('exercisePerformances', (p) => p.userId === userId && p.exerciseName === ex.name)
          .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

        return {
          ...ex,
          previousPerformance: pastPerf
            ? {
                weightKg: pastPerf.weightKg,
                reps: pastPerf.reps,
                date: pastPerf.date,
                isPR: pastPerf.isPersonalRecord,
              }
            : null,
        };
      });
    }

    res.json({
      success: true,
      dayName: currentDayName,
      isRestDay,
      workout: targetWorkout ? { ...targetWorkout, exercises: enrichedExercises } : null,
      restDayGuidance: isRestDay
        ? {
            title: 'Scheduled Recovery Day',
            message: 'Active recovery day. Focus on 8+ hours sleep, light 20-30 minute walking, foam rolling, and meeting daily hydration targets.',
            nextTrainingDay: (plan.schedule || []).find((s) => !s.isRestDay && s.dayOfWeek !== currentDayName)?.dayOfWeek || 'Tomorrow',
          }
        : null,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWorkoutById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;
    const plan = Storage.findOne('workoutPlans', (p) => p.userId === userId && p.status === 'active');

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Plan not found.' });
    }

    const workout = (plan.workouts || []).find((w) => w.id === id || String(w._id) === id);
    if (!workout) {
      return res.status(404).json({ success: false, message: 'Workout not found.' });
    }

    res.json({ success: true, workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
