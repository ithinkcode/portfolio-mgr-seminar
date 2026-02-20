import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { createPortfolioSchema, updatePortfolioSchema, patchPortfolioSchema, parseResumeSchema } from '../schemas/portfolio.schema';
import * as portfolioController from '../controllers/portfolio.controller';

const router = Router();

router.use(authMiddleware);

router.get('/pdf', portfolioController.getPdf);
router.post('/publish', portfolioController.publish);
router.post('/unpublish', portfolioController.unpublish);
router.post('/parse-resume', validate(parseResumeSchema), portfolioController.parseResumeHandler);

router.get('/', portfolioController.get);
router.post('/', validate(createPortfolioSchema), portfolioController.create);
router.put('/', validate(updatePortfolioSchema), portfolioController.update);
router.patch('/', validate(patchPortfolioSchema), portfolioController.patch);
router.delete('/', portfolioController.remove);

export default router;
