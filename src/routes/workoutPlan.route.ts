import { Router } from 'express';
import { createPlan, getPlans, getPlanById } from '../controllers/workoutPlan.controller';

const router = Router();

router.post('/', createPlan);
router.get('/', getPlans);
router.get('/:id', getPlanById);

export default router;
