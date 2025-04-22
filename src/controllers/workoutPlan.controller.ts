import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { WorkoutPlanModel } from '../models/workoutPlan.model';
import { ExerciseModel } from '../models/exercise.model';

export const createPlan = async (req: Request, res: Response): Promise<void> => {
  const { userId, targetCalories } = req.body;

  if (!userId || !targetCalories || typeof targetCalories !== 'number') {
     res.status(400).json({ error: 'Invalid input' });
     return;
  }

  try {
    const allExercises = await ExerciseModel.find().lean();
    const selectedExercises: any[] = [];
    let currentCalories = 0;

    for (const ex of allExercises) {
      const calories = (ex as any).totalCalories || 0;
      if (currentCalories + calories <= targetCalories) {
        selectedExercises.push(ex);
        currentCalories += calories;
      }
      if (currentCalories >= targetCalories * 0.9) break;
    }

    const newPlan = new WorkoutPlanModel({
      id: uuidv4(),
      userId,
      targetCalories,
      exercises: selectedExercises,
      totalCalories: currentCalories,
      createdAt: Date.now(),
    });

    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create workout plan' });
  }
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
