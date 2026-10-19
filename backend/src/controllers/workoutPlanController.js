import { Storage } from '../services/storageService.js';
import { aiWorkoutService } from '../services/aiWorkoutService.js';

export const getWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    let plan = Storage.findOne('workoutPlans', (p) => p.userId === userId && p.status === 'active');

    if (!plan) {
      // Check if any plan exists for user
      plan = Storage.findOne('workoutPlans', (p) => p.userId === userId);
    }

    res.json({ success: true, workoutPlan: plan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const generateWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const assessment = Storage.findOne('fitnessAssessments', (a) => a.userId === userId) || {
      primaryGoal: req.body.primaryGoal || 'build_muscle',
      daysPerWeekAvailable: req.body.daysPerWeekAvailable || 4,
      experienceLevel: req.body.experienceLevel || 'intermediate',
      availableEquipment: req.body.availableEquipment || ['full_gym'],
    };

    const profile = Storage.findOne('userProfiles', (p) => p.userId === userId) || {};
    const generated = await aiWorkoutService.generateWorkoutPlan(assessment, profile);

    // Save as active plan
    const newPlan = Storage.create('workoutPlans', {
      ...generated,
      userId,
      status: 'active',
    });

    res.status(201).json({
      success: true,
      workoutPlan: newPlan,
      message: 'New personalized workout plan generated successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWorkoutPlan = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const plan = Storage.findOne('workoutPlans', (p) => p.userId === userId && p.status === 'active');

    if (!plan) {
      return res.status(404).json({ success: false, message: 'Active workout plan not found.' });
    }

    const updated = Storage.updateOne('workoutPlans', (p) => p.id === plan.id, req.body);
    res.json({ success: true, workoutPlan: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
