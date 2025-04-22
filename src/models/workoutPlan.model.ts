import mongoose, { Schema } from 'mongoose';

const workoutPlanSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
  },
  targetCalories: {
    type: Number,
    required: true,
  },
  exercises: {
    type: [Object],
    required: true,
  },
  totalCalories: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Number,
    required: true,
  },
});

export const WorkoutPlanModel = mongoose.model('WorkoutPlan', workoutPlanSchema);
