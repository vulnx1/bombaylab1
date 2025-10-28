import { Router } from 'express';
import { adminLogin, listSamples, getSample, getSamplePdf } from '../controllers/adminController.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/login', adminLogin);
router.get('/samples', requireAdmin, listSamples);
router.get('/samples/:id', requireAdmin, getSample);
router.get('/samples/:id/pdf', requireAdmin, getSamplePdf);

export default router;
