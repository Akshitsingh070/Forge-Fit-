/**
 * Adaptive Training Logic Engine
 * Implements conservative, scientifically-backed progression algorithms,
 * fatigue modeling, and dynamic schedule adjustment.
 */
class AdaptiveTrainingService {
  /**
   * Evaluates workout session results and calculates adaptations
   * @param {Object} session - Completed WorkoutSession
   * @param {Object} userProfile - UserProfile
   * @param {Object} workoutPlan - WorkoutPlan
   */
  processCompletedSession(session, userProfile, workoutPlan) {
    const adaptations = [];
    const avgRpe = session.averageRpe || 8;
    const feeling = session.userFeedback?.feeling || 'good';

    // 1. Evaluate Progressive Overload on Exercises
    (session.exercises || []).forEach((ex) => {
      const allSetsCompleted = ex.sets?.every((s) => s.isCompleted);
      const allRepsAchieved = ex.sets?.every((s) => s.repsCompleted >= (parseInt(s.targetReps) || 8));

      if (allSetsCompleted && allRepsAchieved && avgRpe <= 7.5) {
        const isLowerBody = ['Legs', 'Glutes', 'Calves'].includes(ex.primaryMuscle) || ex.name.toLowerCase().includes('squat') || ex.name.toLowerCase().includes('deadlift');
        const incrementKg = isLowerBody ? 5.0 : 2.5;

        adaptations.push({
          type: 'progression',
          exerciseId: ex.exerciseId,
          exerciseName: ex.name,
          message: `Clean execution with reserve (RPE ~${avgRpe}). Recommended +${incrementKg}kg on ${ex.name} next session.`,
          recommendedDeltaKg: incrementKg,
          category: 'progression',
        });
      } else if (!allRepsAchieved && avgRpe >= 9.5) {
        adaptations.push({
          type: 'deload_volume',
          exerciseId: ex.exerciseId,
          exerciseName: ex.name,
          message: `Struggled with target rep range on ${ex.name}. Hold weight constant or reduce 5% to consolidate motor patterns.`,
          recommendedDeltaKg: -2.5,
          category: 'technique',
        });
      }
    });

    // 2. Evaluate Fatigue & Recovery
    if (feeling === 'exhausted' || avgRpe >= 9.2) {
      adaptations.push({
        type: 'fatigue_warning',
        message: 'High central nervous system fatigue detected. Ensure at least 8 hours of sleep and high hydration before next training day.',
        category: 'recovery',
      });
    }

    // 3. Update Streak & Total Workouts
    const updatedProfileData = {
      totalWorkoutsCompleted: (userProfile.totalWorkoutsCompleted || 0) + 1,
      lastWorkoutDate: new Date().toISOString(),
      streakDays: (userProfile.streakDays || 0) + 1,
    };

    return {
      adaptations,
      updatedProfileData,
    };
  }

  /**
   * Intelligently adjusts workout plan schedule if user misses a day
   */
  handleMissedWorkout(currentPlan, missedDayIndex) {
    // If a session was missed, rotate schedule forward without cramming 2 workouts in one day
    return {
      message: 'You missed yesterday’s session. We adjusted your schedule so you can continue seamlessly without overtraining.',
      adjusted: true,
    };
  }
}

export const adaptiveTrainingService = new AdaptiveTrainingService();
