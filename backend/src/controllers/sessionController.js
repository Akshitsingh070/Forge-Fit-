import { Storage } from '../services/storageService.js';
import { adaptiveTrainingService } from '../services/adaptiveTrainingService.js';

export const createSession = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const sessionData = req.body;

    const newSession = Storage.create('workoutSessions', {
      userId,
      workoutTitle: sessionData.workoutTitle || 'Custom Gym Session',
      dayName: sessionData.dayName || 'Today',
      focus: sessionData.focus || 'Strength & Hypertrophy',
      startedAt: new Date().toISOString(),
      status: 'in_progress',
      exercises: sessionData.exercises || [],
      totalSetsCompleted: 0,
      totalVolumeKg: 0,
    });

    res.status(201).json({ success: true, session: newSession });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;
    const updateData = req.body;

    const existing = Storage.findOne('workoutSessions', (s) => s.id === id && s.userId === userId);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'Workout session not found.' });
    }

    let isNowCompleted = updateData.status === 'completed' && existing.status !== 'completed';
    let totalVolumeKg = 0;
    let totalSetsCompleted = 0;
    let newPRs = [];

    const exercises = updateData.exercises || existing.exercises || [];

    // Calculate volume and check PRs
    exercises.forEach((ex) => {
      (ex.sets || []).forEach((set) => {
        if (set.isCompleted) {
          totalSetsCompleted += 1;
          const weight = Number(set.weightKg) || 0;
          const reps = Number(set.repsCompleted) || 0;
          totalVolumeKg += weight * reps;

          // Estimate 1RM using Epley formula: weight * (1 + reps/30)
          if (weight > 0 && reps > 0) {
            const e1rm = Math.round(weight * (1 + reps / 30) * 10) / 10;
            // Check historical PR
            const pastBest = Storage.find('exercisePerformances', (p) => p.userId === userId && p.exerciseName === ex.name)
              .sort((a, b) => b.estimatedOneRepMax - a.estimatedOneRepMax)[0];

            const isPR = !pastBest || e1rm > pastBest.estimatedOneRepMax;
            if (isPR && !newPRs.some((p) => p.exerciseName === ex.name)) {
              newPRs.push({ exerciseName: ex.name, weightKg: weight, reps, estimatedOneRepMax: e1rm });
            }

            if (isNowCompleted) {
              Storage.create('exercisePerformances', {
                userId,
                exerciseName: ex.name,
                date: new Date().toISOString(),
                weightKg: weight,
                reps,
                estimatedOneRepMax: e1rm,
                totalVolumeKg: weight * reps,
                rpe: set.rpe || 8,
                isPersonalRecord: isPR,
              });
            }
          }
        }
      });
    });

    const enrichedUpdate = {
      ...updateData,
      totalVolumeKg,
      totalSetsCompleted,
      completedAt: isNowCompleted ? new Date().toISOString() : existing.completedAt,
    };

    const updatedSession = Storage.updateOne('workoutSessions', (s) => s.id === id, enrichedUpdate);

    let adaptiveResult = null;
    let nextActionCard = null;

    if (isNowCompleted) {
      const userProfile = Storage.findOne('userProfiles', (p) => p.userId === userId) || {};
      const workoutPlan = Storage.findOne('workoutPlans', (p) => p.userId === userId && p.status === 'active');

      adaptiveResult = adaptiveTrainingService.processCompletedSession(updatedSession, userProfile, workoutPlan);

      // Update profile stats
      Storage.updateOne('userProfiles', (p) => p.userId === userId, adaptiveResult.updatedProfileData);

      // Create "What's Next?" recommendation card
      nextActionCard = Storage.create('recommendations', {
        userId,
        title: 'Workout Logged! Rest & Hydrate',
        description: `Great session! You moved ${totalVolumeKg.toLocaleString()} kg across ${totalSetsCompleted} sets. Your next priority is post-workout nutrition and recovery.`,
        category: 'next_action',
        priority: 'high',
        actionLabel: 'View Progress Chart',
        actionRoute: '/dashboard/progress',
        isRead: false,
      });

      // Add any progressive overload recommendations
      (adaptiveResult.adaptations || []).forEach((ad) => {
        if (ad.type === 'progression') {
          Storage.create('recommendations', {
            userId,
            title: `Progressive Overload: ${ad.exerciseName}`,
            description: ad.message,
            category: 'progression',
            priority: 'medium',
            actionLabel: 'Review Progression',
            actionRoute: '/dashboard/progress',
            isRead: false,
          });
        }
      });
    }

    res.json({
      success: true,
      session: updatedSession,
      isCompleted: isNowCompleted,
      summary: isNowCompleted
        ? {
            durationSeconds: updatedSession.durationSeconds || 0,
            exercisesCompleted: exercises.filter((e) => e.isCompleted).length,
            totalSets: totalSetsCompleted,
            totalVolumeKg,
            personalRecords: newPRs,
            nextAction: nextActionCard,
          }
        : null,
    });
  } catch (error) {
    console.error('[Session Error]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSessionHistory = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const history = Storage.find('workoutSessions', (s) => s.userId === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
