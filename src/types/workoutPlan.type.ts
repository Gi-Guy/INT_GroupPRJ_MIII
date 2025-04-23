import { Exercise } from "./exercise.type";

export interface WorkoutPlan {
    id: string;
    userId: string;
    targetCalories: number;
    exercises: Exercise[];
    totalCalories: number;
    createdAt: number;
}

export interface WorkoutPlanInput {
    userId: string;
    targetCalories: number;
  }