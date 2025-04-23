import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutPlanModel } from '../models/workoutPlan.model';
import { ExerciseModel } from '../models/exercise.model';

export const createWorkoutPlan = async (req: Request, res: Response) => {
  const { userId, targetCalories } = req.body;
  const exercises = await ExerciseModel.find();

  const selected = [];
  let total = 0;

  for (const ex of exercises) {
    const cal = (ex as any).totalCalories || 0;
    if (total + cal <= targetCalories) {
      selected.push(ex);
      total += cal;
    }
  }

  res.status(200).json({ exercises: selected });
};

export const getPlans = async (_: Request, res: Response): Promise<void> => {
  try {
    const plans = await WorkoutPlanModel.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plans' });
  }
};

export const getPlanById = async (req: Request, res: Response): Promise<void> => {
  try {
    const plan = await WorkoutPlanModel.findOne({ id: req.params.id });
    if (!plan){
         res.status(404).json({ error: 'Plan not found' });
         return;
        }
    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch plan' });
  }
};
