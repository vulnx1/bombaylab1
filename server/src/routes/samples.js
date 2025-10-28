import { Router } from 'express';
import { createSample } from '../controllers/samplesController.js';

const router = Router();

router.post('/', createSample);

export default router;
