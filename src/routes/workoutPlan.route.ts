import { Router } from 'express';
import {  getPlans, getPlanById, createWorkoutPlan } from '../controllers/workoutPlan.controller';

const router = Router();

router.post('/', createWorkoutPlan);
router.get('/', getPlans);
router.get('/:id', getPlanById);

export default router;
