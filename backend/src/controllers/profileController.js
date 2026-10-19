import { Storage } from '../services/storageService.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    let profile = Storage.findOne('userProfiles', (p) => p.userId === userId);

    if (!profile) {
      profile = Storage.create('userProfiles', {
        userId,
        age: 26,
        gender: 'male',
        height: 175,
        weight: 75,
        unitPreference: 'metric',
        streakDays: 0,
        totalWorkoutsCompleted: 0,
      });
    }

    res.json({ success: true, profile });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;
    const updateData = req.body;

    let updated = Storage.updateOne('userProfiles', (p) => p.userId === userId, updateData);
    if (!updated) {
      updated = Storage.create('userProfiles', { userId, ...updateData });
    }

    res.json({ success: true, profile: updated, message: 'Profile updated successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
