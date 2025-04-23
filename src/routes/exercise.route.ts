import { Router } from 'express';
import {
  createExercise,
  getAllExercises,
  getExerciseById,
  updateExercise,
  deleteExercise
} from '../controllers/exercise.controller';

const router = Router();

router.post('/', createExercise);
router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
router.put('/:id', updateExercise);
router.delete('/:id', deleteExercise);

export default router;