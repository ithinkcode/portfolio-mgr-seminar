import { Router } from 'express';
import * as publicController from '../controllers/public.controller';

const router = Router();

router.get('/portfolio/:slug', publicController.getBySlug);

export default router;
