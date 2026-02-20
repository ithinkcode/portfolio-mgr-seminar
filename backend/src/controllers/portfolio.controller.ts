import { Request, Response } from 'express';
import { asyncHandler } from '../utils/asyncHandler';
import * as portfolioService from '../services/portfolio.service';
import { generatePortfolioHtml } from '../templates/portfolioPdf';
import { generatePdf } from '../services/pdf.service';


export const get = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.getByUserId(req.user!.id);
  if (!portfolio) {
    res.status(404).json({ error: 'Portfolio not found', statusCode: 404 });
    return;
  }
  res.json({ data: portfolio });
});

export const create = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.create(req.user!.id, req.body);
  res.status(201).json({ data: portfolio });
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.update(req.user!.id, req.body);
  res.json({ data: portfolio });
});

export const patch = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.patch(req.user!.id, req.body);
  res.json({ data: portfolio });
});

export const publish = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.publish(req.user!.id);
  res.json({ data: portfolio });
});

export const unpublish = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.unpublish(req.user!.id);
  res.json({ data: portfolio });
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await portfolioService.remove(req.user!.id);
  res.json({ data: { message: 'Portfolio deleted' } });
});

export const getPdf = asyncHandler(async (req: Request, res: Response) => {
  const portfolio = await portfolioService.getByUserId(req.user!.id);
  if (!portfolio) {
    res.status(404).json({ error: 'Portfolio not found', statusCode: 404 });
    return;
  }

  const html = generatePortfolioHtml(portfolio as any, portfolio.user as any);
  const buffer = await generatePdf(html);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="portfolio-${portfolio.slug}.pdf"`,
    'Content-Length': buffer.length.toString(),
  });
  res.end(buffer);
});

