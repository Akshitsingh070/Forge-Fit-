import { Storage } from '../services/storageService.js';

export const getExercises = async (req, res) => {
  try {
    const { category, equipment, difficulty, search } = req.query;
    let list = Storage.getCollection('exercises');

    if (category && category !== 'All') {
      list = list.filter((e) => e.category.toLowerCase() === category.toLowerCase());
    }

    if (equipment && equipment !== 'All') {
      list = list.filter((e) => e.equipment.toLowerCase() === equipment.toLowerCase());
    }

    if (difficulty && difficulty !== 'All') {
      list = list.filter((e) => e.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.primaryMuscle.toLowerCase().includes(q) ||
          (e.secondaryMuscles && e.secondaryMuscles.some((m) => m.toLowerCase().includes(q)))
      );
    }

    res.json({
      success: true,
      count: list.length,
      exercises: list,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getExerciseById = async (req, res) => {
  try {
    const { id } = req.params;
    const exercise = Storage.findOne('exercises', (e) => e.id === id || e.slug === id || e._id === id);

    if (!exercise) {
      return res.status(404).json({ success: false, message: 'Exercise not found.' });
    }

    res.json({ success: true, exercise });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
