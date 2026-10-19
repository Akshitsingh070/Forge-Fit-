import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Storage } from '../services/storageService.js';
import { User } from '../models/User.js';
import { UserProfile } from '../models/UserProfile.js';

const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'forgefit_super_secret_jwt_key_982347109238470129384';
  return jwt.sign({ id }, secret, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    // Check if user already exists
    const existing = Storage.findOne('users', (u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = Storage.create('users', {
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: 'user',
    });

    const newProfile = Storage.create('userProfiles', {
      userId: newUser.id,
      age: 26,
      gender: 'male',
      height: 175,
      weight: 75,
      streakDays: 0,
      totalWorkoutsCompleted: 0,
    });

    const token = generateToken(newUser.id);
    const { password: _, ...userSafe } = newUser;

    res.status(201).json({
      success: true,
      token,
      user: userSafe,
      profile: newProfile,
      message: 'Account created successfully.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = Storage.findOne('users', (u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Password incorrect.' });
    }

    const token = generateToken(user.id);
    const profile = Storage.findOne('userProfiles', (p) => p.userId === user.id);
    const { password: _, ...userSafe } = user;

    res.json({
      success: true,
      token,
      user: userSafe,
      profile,
      message: 'Welcome back to ForgeFit AI.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = req.user;
    const profile = Storage.findOne('userProfiles', (p) => p.userId === user.id || p.userId === user._id);
    res.json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const demoLogin = async (req, res) => {
  try {
    const user = Storage.findOne('users', (u) => u.email === 'demo@forgefit.ai');
    if (!user) {
      return res.status(404).json({ success: false, message: 'Demo account not initialized.' });
    }

    const token = generateToken(user.id);
    const profile = Storage.findOne('userProfiles', (p) => p.userId === user.id);
    const { password: _, ...userSafe } = user;

    res.json({
      success: true,
      token,
      user: userSafe,
      profile,
      message: 'Logged in to ForgeFit Demo Account.',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
