import { Router } from 'express';
import adminRoutes from './admin.js';
import sampleRoutes from './samples.js';

const router = Router();

router.use('/samples', sampleRoutes);
router.use('/admin', adminRoutes);

export default router;
