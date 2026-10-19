import { Storage } from '../services/storageService.js';
import { aiWorkoutService } from '../services/aiWorkoutService.js';

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    let recs = Storage.find('recommendations', (r) => r.userId === userId && !r.isDismissed)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // If no active recommendations, synthesize a contextual "What should I do next?" card
    if (recs.length === 0) {
      const plan = Storage.findOne('workoutPlans', (p) => p.userId === userId && p.status === 'active');
      const profile = Storage.findOne('userProfiles', (p) => p.userId === userId);
      const lastSession = Storage.find('workoutSessions', (s) => s.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

      const hasTrainedToday = lastSession && new Date(lastSession.createdAt).toDateString() === new Date().toDateString();

      const dynamicNext = aiWorkoutService.generateNextActionRecommendation({
        hasTrainedToday,
        lastSession,
        streakDays: profile?.streakDays || 0,
        weeklyWorkoutsDone: 3,
        primaryGoal: plan?.goal || 'build_muscle',
        targetDaysPerWeek: plan?.weeklyFrequency || 4,
      });

      const fallbackRec = Storage.create('recommendations', {
        userId,
        title: hasTrainedToday ? 'Next Phase: Recovery Protocol' : "Today's Workout is Primed",
        description: dynamicNext.nextAction,
        category: dynamicNext.category,
        priority: dynamicNext.priority,
        actionLabel: dynamicNext.actionLabel,
        actionRoute: dynamicNext.actionRoute,
        isRead: false,
      });
      recs = [fallbackRec];
    }

    res.json({ success: true, recommendations: recs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const dismissRecommendation = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id || req.user._id;
    const updated = Storage.updateOne('recommendations', (r) => r.id === id && r.userId === userId, { isDismissed: true });
    res.json({ success: true, message: 'Recommendation dismissed.', recommendation: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
