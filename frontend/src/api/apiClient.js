const API_BASE = '/api';

const getHeaders = (extraHeaders = {}) => {
  const token = localStorage.getItem('forgefit_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...extraHeaders,
  };
};

export const api = {
  // Auth
  register: async (data) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  login: async (data) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  demoLogin: async () => {
    const res = await fetch(`${API_BASE}/auth/demo-login`, {
      method: 'POST',
      headers: getHeaders(),
    });
    return res.json();
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Profile
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  updateProfile: async (data) => {
    const res = await fetch(`${API_BASE}/profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Assessment & AI Generation
  saveAssessment: async (data) => {
    const res = await fetch(`${API_BASE}/assessment`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getAssessment: async () => {
    const res = await fetch(`${API_BASE}/assessment`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Workout Plan
  getWorkoutPlan: async () => {
    const res = await fetch(`${API_BASE}/workout-plan`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  generateWorkoutPlan: async (data = {}) => {
    const res = await fetch(`${API_BASE}/workout-plan/generate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateWorkoutPlan: async (data) => {
    const res = await fetch(`${API_BASE}/workout-plan`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Today's Workout
  getTodayWorkout: async () => {
    const res = await fetch(`${API_BASE}/workouts/today`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  getWorkoutById: async (id) => {
    const res = await fetch(`${API_BASE}/workouts/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Sessions
  createSession: async (data) => {
    const res = await fetch(`${API_BASE}/workout-session`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  updateSession: async (id, data) => {
    const res = await fetch(`${API_BASE}/workout-session/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  getSessionHistory: async () => {
    const res = await fetch(`${API_BASE}/workout-session/history`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Progress
  getProgress: async () => {
    const res = await fetch(`${API_BASE}/progress`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  logProgress: async (data) => {
    const res = await fetch(`${API_BASE}/progress`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // Exercises
  getExercises: async (params = {}) => {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/exercises?${query}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  getExerciseById: async (id) => {
    const res = await fetch(`${API_BASE}/exercises/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Recommendations
  getRecommendations: async () => {
    const res = await fetch(`${API_BASE}/recommendations`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },

  dismissRecommendation: async (id) => {
    const res = await fetch(`${API_BASE}/recommendations/${id}/dismiss`, {
      method: 'PUT',
      headers: getHeaders(),
    });
    return res.json();
  },

  // Nutrition
  getNutritionGuidance: async () => {
    const res = await fetch(`${API_BASE}/nutrition`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return res.json();
  },
};
