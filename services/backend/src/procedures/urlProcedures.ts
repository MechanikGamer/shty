import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createShortUrl, getOriginalUrl } from '../models/urlModel';

const t = initTRPC.create();

const urlSchema = z.object({
  originalUrl: z.string().url({ message: 'Invalid URL format' }),
  userId: z.string(),
  expirationDate: z
    .string()
    .datetime({ message: 'Invalid expiration date format' })
    .optional(),
});

const shortCodeSchema = z.object({
  shortCode: z.string().min(1, { message: 'Short code is required' }),
});

export const urlProcedures = t.router({
  createUrl: t.procedure
    .input(urlSchema)
    .mutation(async ({ input }) => {
      try {
        const { originalUrl, userId, expirationDate } = input;

        const shortUrl = await createShortUrl(
          originalUrl,
          userId,
          expirationDate ? new Date(expirationDate) : null
        );

        return {
          success: true,
          message: 'Short URL created successfully',
          shortCode: shortUrl.shortCode,
          prefix: shortUrl.prefix,
          suffix: shortUrl.suffix,
          strippedUrl: shortUrl.strippedUrl, 
        };
      } catch (error) {
        console.error('Error creating short URL:', error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create short URL',
        });
      }
    }),

  getUrl: t.procedure
    .input(shortCodeSchema)
    .query(async ({ input }) => {
      try {
        const { shortCode } = input;

        const originalUrl = await getOriginalUrl(shortCode);

        return {
          success: true,
          message: 'Original URL retrieved successfully',
          originalUrl,
        };
      } catch (error) {
        console.error('Error retrieving original URL:', error);
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Short URL not found',
        });
      }
    }),
});
