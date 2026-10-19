import { Storage } from '../services/storageService.js';
import { aiWorkoutService } from '../services/aiWorkoutService.js';

export const saveAssessment = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const assessmentData = req.body;

    // Update physical profile metrics if provided in onboarding
    if (assessmentData.age || assessmentData.weight || assessmentData.height || assessmentData.gender) {
      Storage.updateOne(
        'userProfiles',
        (p) => p.userId === userId,
        {
          age: assessmentData.age ? Number(assessmentData.age) : undefined,
          gender: assessmentData.gender || undefined,
          height: assessmentData.height ? Number(assessmentData.height) : undefined,
          weight: assessmentData.weight ? Number(assessmentData.weight) : undefined,
          activityLevel: assessmentData.dailyActivityLevel || undefined,
          averageSleepHours: assessmentData.averageSleepHours ? Number(assessmentData.averageSleepHours) : undefined,
          stressLevel: assessmentData.stressLevel || undefined,
          occupationType: assessmentData.occupationType || undefined,
        }
      );
    }

    // Upsert Assessment
    let assessment = Storage.findOne('fitnessAssessments', (a) => a.userId === userId);
    if (assessment) {
      assessment = Storage.updateOne('fitnessAssessments', (a) => a.userId === userId, {
        ...assessmentData,
        status: 'active',
        updatedAt: new Date().toISOString(),
      });
    } else {
      assessment = Storage.create('fitnessAssessments', {
        userId,
        ...assessmentData,
        status: 'active',
      });
    }

    // Automatically synthesize personalized workout plan using AI service
    const profile = Storage.findOne('userProfiles', (p) => p.userId === userId) || {};
    const generatedPlan = await aiWorkoutService.generateWorkoutPlan(assessment, profile);

    // Save as active plan for this user
    let existingPlan = Storage.findOne('workoutPlans', (p) => p.userId === userId && p.status === 'active');
    let savedPlan;
    if (existingPlan) {
      savedPlan = Storage.updateOne('workoutPlans', (p) => p.id === existingPlan.id, {
        ...generatedPlan,
        userId,
        status: 'active',
      });
    } else {
      savedPlan = Storage.create('workoutPlans', {
        ...generatedPlan,
        userId,
        status: 'active',
      });
    }

    // Create fresh Next Up recommendation
    Storage.create('recommendations', {
      userId,
      title: `Plan Ready: ${savedPlan.programName}`,
      description: generatedPlan.nextAction || "Today's workout is ready. Start your first session.",
      category: 'next_action',
      priority: 'high',
      actionLabel: 'View Workout',
      actionRoute: '/dashboard/workout',
      isRead: false,
    });

    res.status(201).json({
      success: true,
      assessment,
      workoutPlan: savedPlan,
      message: 'Fitness assessment recorded and personalized workout plan synthesized.',
    });
  } catch (error) {
    console.error('[Assessment Error]', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAssessment = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const assessment = Storage.findOne('fitnessAssessments', (a) => a.userId === userId);
    res.json({ success: true, assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
