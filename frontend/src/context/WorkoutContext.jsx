import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { api } from '../api/apiClient';
import { useAuth } from './AuthContext';

const WorkoutContext = createContext(null);

export const WorkoutProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [todayWorkoutData, setTodayWorkoutData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);

  // Live Workout Player State
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [activeWorkout, setActiveWorkout] = useState(null);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Rest Timer State
  const [isRestTimerActive, setIsRestTimerActive] = useState(false);
  const [restSecondsRemaining, setRestSecondsRemaining] = useState(0);
  const [totalRestSeconds, setTotalRestSeconds] = useState(90);

  // Sound effects enabled
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Load plan & today's workout on authentication
  const loadWorkoutData = async () => {
    if (!isAuthenticated) return;
    setIsLoadingPlan(true);
    try {
      const [planRes, todayRes, recRes] = await Promise.all([
        api.getWorkoutPlan(),
        api.getTodayWorkout(),
        api.getRecommendations(),
      ]);

      if (planRes.success && planRes.workoutPlan) {
        setWorkoutPlan(planRes.workoutPlan);
      }
      if (todayRes.success) {
        setTodayWorkoutData(todayRes);
      }
      if (recRes.success && recRes.recommendations) {
        setRecommendations(recRes.recommendations);
      }
    } catch (e) {
      console.warn('[WorkoutContext] Load error', e);
    } finally {
      setIsLoadingPlan(false);
    }
  };

  useEffect(() => {
    loadWorkoutData();
  }, [isAuthenticated]);

  // Live elapsed workout timer
  useEffect(() => {
    let interval = null;
    if (isWorkoutActive) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setElapsedSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isWorkoutActive]);

  // Rest timer countdown and audio chime
  useEffect(() => {
    let interval = null;
    if (isRestTimerActive && restSecondsRemaining > 0) {
      interval = setInterval(() => {
        setRestSecondsRemaining((prev) => {
          if (prev <= 1) {
            playChimeSound();
            setIsRestTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRestTimerActive, restSecondsRemaining]);

  // Web Audio API beep synthesizer (pure browser, zero audio file dependencies)
  const playChimeSound = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
      osc.frequency.exponentialRampToValueAtTime(1320, audioCtx.currentTime + 0.15); // E6 note

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      // AudioContext may be blocked before gesture
    }
  };

  const startRestTimer = (seconds = 90) => {
    setTotalRestSeconds(seconds);
    setRestSecondsRemaining(seconds);
    setIsRestTimerActive(true);
  };

  const skipRestTimer = () => {
    setIsRestTimerActive(false);
    setRestSecondsRemaining(0);
  };

  const addRestSeconds = (extra = 30) => {
    setRestSecondsRemaining((prev) => prev + extra);
    setTotalRestSeconds((prev) => prev + extra);
  };

  const startLiveWorkout = async (workout) => {
    setActiveWorkout(workout);
    setIsWorkoutActive(true);
    setSessionStartTime(new Date());
    setElapsedSeconds(0);

    // Initialize session exercises with empty set checklists
    const formattedExercises = (workout.exercises || []).map((ex) => ({
      exerciseId: ex.exerciseId || ex.id,
      name: ex.name,
      primaryMuscle: ex.primaryMuscle,
      isCompleted: false,
      notes: '',
      sets: Array.from({ length: ex.targetSets || 3 }, (_, idx) => ({
        setNumber: idx + 1,
        targetReps: ex.targetReps || '8-12',
        weightKg: ex.recommendedWeightKg || 0,
        repsCompleted: parseInt(ex.targetReps) || 8,
        rpe: ex.rpeTarget || 8,
        isCompleted: false,
      })),
    }));

    try {
      const res = await api.createSession({
        workoutTitle: workout.title,
        dayName: workout.dayName,
        focus: workout.focus,
        exercises: formattedExercises,
      });

      if (res.success && res.session) {
        setCurrentSession(res.session);
      }
    } catch (e) {
      console.warn('Could not initialize session on backend', e);
    }
  };

  const cancelLiveWorkout = () => {
    setIsWorkoutActive(false);
    setCurrentSession(null);
    setActiveWorkout(null);
    setIsRestTimerActive(false);
  };

  return (
    <WorkoutContext.Provider
      value={{
        workoutPlan,
        setWorkoutPlan,
        todayWorkoutData,
        recommendations,
        isLoadingPlan,
        loadWorkoutData,

        // Live workout
        isWorkoutActive,
        currentSession,
        activeWorkout,
        elapsedSeconds,
        startLiveWorkout,
        cancelLiveWorkout,
        setCurrentSession,

        // Rest timer
        isRestTimerActive,
        restSecondsRemaining,
        totalRestSeconds,
        startRestTimer,
        skipRestTimer,
        addRestSeconds,
        soundEnabled,
        setSoundEnabled,
        playChimeSound,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
