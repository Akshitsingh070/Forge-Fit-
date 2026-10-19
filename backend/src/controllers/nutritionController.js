import { Storage } from '../services/storageService.js';

export const getNutritionGuidance = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const profile = Storage.findOne('userProfiles', (p) => p.userId === userId) || {};
    const assessment = Storage.findOne('fitnessAssessments', (a) => a.userId === userId) || {};

    const weightKg = profile.weight || 78;
    const heightCm = profile.height || 178;
    const age = profile.age || 26;
    const gender = profile.gender || 'male';
    const primaryGoal = assessment.primaryGoal || 'build_muscle';
    const activityLevel = assessment.dailyActivityLevel || profile.activityLevel || 'moderate';

    // 1. Basal Metabolic Rate (Mifflin-St Jeor Formula)
    let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
    bmr += gender === 'female' ? -161 : 5;

    // 2. Activity Multiplier
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very_active: 1.725,
      athlete: 1.9,
    };
    const tdee = Math.round(bmr * (multipliers[activityLevel] || 1.55));

    // 3. Goal Calorie Adjustment
    let targetCalories = tdee;
    let strategy = '';
    let proteinPerKg = 2.0;

    switch (primaryGoal) {
      case 'build_muscle':
      case 'gain_strength':
        targetCalories = Math.round(tdee + 300); // Clean 300 kcal surplus
        strategy = 'Hypertrophic Surplus (+300 kcal) to support new contractile tissue synthesis with minimal fat gain.';
        proteinPerKg = 2.0;
        break;
      case 'lose_fat':
        targetCalories = Math.round(tdee - 450); // Moderate deficit
        strategy = 'Sparing Deficit (-450 kcal) to prioritize fat oxidation while high protein protects lean muscle tissue.';
        proteinPerKg = 2.2;
        break;
      case 'body_recomposition':
        targetCalories = Math.round(tdee - 100);
        strategy = 'Eucaloric / Slight Deficit (-100 kcal) with high protein turnover for concurrent muscle gain and fat loss.';
        proteinPerKg = 2.2;
        break;
      default:
        targetCalories = tdee;
        strategy = 'Metabolic Maintenance ensuring energy balance and vital systemic recovery.';
        proteinPerKg = 1.8;
        break;
    }

    // 4. Macronutrient Breakdown
    const proteinGrams = Math.round(weightKg * proteinPerKg);
    const proteinCalories = proteinGrams * 4;

    const fatGrams = Math.round((targetCalories * 0.25) / 9); // 25% of energy from healthy fats
    const fatCalories = fatGrams * 9;

    const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
    const carbGrams = Math.round(carbCalories / 4);

    // 5. Hydration
    const hydrationLiters = (weightKg * 0.035 + 0.6).toFixed(1);

    res.json({
      success: true,
      nutrition: {
        bmr: Math.round(bmr),
        tdee,
        targetCalories,
        strategy,
        primaryGoal,
        hydrationLiters,
        macros: {
          protein: { grams: proteinGrams, calories: proteinCalories, percentage: Math.round((proteinCalories / targetCalories) * 100) },
          carbs: { grams: carbGrams, calories: carbCalories, percentage: Math.round((carbCalories / targetCalories) * 100) },
          fats: { grams: fatGrams, calories: fatCalories, percentage: Math.round((fatCalories / targetCalories) * 100) },
        },
        mealTimingTips: [
          'Pre-Workout: 30-45g complex/simple carbs + 20g protein 1-2 hours before lifting.',
          'Intra-Workout: 500-750ml water with electrolytes to maintain intracellular hydration and strength output.',
          'Post-Workout: 30-40g fast-digesting protein within 60 minutes to maximize muscle protein synthesis trigger.',
          'Bedtime: 25-30g slow-digesting casein or curd to provide steady amino acid availability during nocturnal recovery.',
        ],
        disclaimer: 'General fitness estimate only. Nutritional requirements vary based on genetics, medical conditions, and daily training intensity. Always consult a qualified physician or registered dietitian before undertaking dietary modifications.',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
