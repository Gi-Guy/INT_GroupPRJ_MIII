import { Request, Response } from 'express';
import { ExerciseModel } from '../models/exercise.model';

// export const createExercise = async (req: Request, res: Response) => {
//   try {
//     const { name, description, totalCalories } = req.body;
//     const exercise = await ExerciseModel.create({ name, description, totalCalories });
//     res.status(201).json(exercise);
//   } catch (error) {
//     console.error('Error creating exercise:', error);
//     res.status(500).json({ error: 'Failed to create exercise' });
//   }
// };
export const createExercise = async (req: Request, res: Response) => {
  try {
    const { name, description, totalCalories} = req.body;
    const newExercise = {
      id: 'ex-' + Date.now(),
      name,
      description,
      totalCalories,
      date: Date.now()
    };
    const created = await ExerciseModel.create(newExercise);
    res.status(201).json(created);
  } catch (err) {
    console.error('Error creating exercise:', err);
    res.status(500).json({ error: 'Failed to create exercise' });
  }
};

export const getAllExercises = async (_req: Request, res: Response) => {
  try {
    const exercises = await ExerciseModel.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercises' });
  }
};
export const getExerciseById = async (req: Request, res: Response):Promise<void>  => {
  try {
    const { id } = req.params;
    const exercise = await ExerciseModel.findById(id);
    if (!exercise) {
       res.status(404).json({ error: 'Exercise not found' });
       return;
    }
    res.json(exercise);
    } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exercise' });
    }
}
export const updateExercise = async (req: Request, res: Response): Promise<void>  => {
  try {
    const { id } = req.params;
    const { name, description, totalCalories } = req.body;
    const exercise = await ExerciseModel.findByIdAndUpdate(id, { name, description, totalCalories }, { new: true });
    if (!exercise) {
       res.status(404).json({ error: 'Exercise not found' });
       return;
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update exercise' });
  }
};
export const deleteExercise = async (req: Request, res: Response):Promise<void>  => {
  try {
    const { id } = req.params;
    const exercise = await ExerciseModel.findByIdAndDelete(id);
    if (!exercise) {
       res.status(404).json({ error: 'Exercise not found' });
       return;
    }
    res.json({ message: 'Exercise deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete exercise' });
  }
};
function randomUUID() {
  throw new Error('Function not implemented.');
}

