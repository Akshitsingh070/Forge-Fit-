import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['next_action', 'progression', 'recovery', 'technique', 'nutrition', 'schedule_adjustment'],
      default: 'next_action',
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    actionLabel: { type: String, default: 'Take Action' },
    actionRoute: { type: String, default: '/dashboard/workout' },
    isRead: { type: Boolean, default: false },
    isDismissed: { type: Boolean, default: false },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export const Recommendation =
  mongoose.models.Recommendation ||
  mongoose.model('Recommendation', recommendationSchema);
