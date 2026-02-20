import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as portfolioService from '../services/portfolio.service';

export const getBySlug = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.getBySlug(req.params.slug as string);
  if (!portfolio) {
    res.status(404).json({ error: 'Portfolio not found', statusCode: 404 });
    return;
  }
  res.json({ data: portfolio });
});
