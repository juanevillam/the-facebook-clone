import { z } from 'zod';

import { feelings } from '../assets/feelings';

export const createPostSchema = z.object({
  thoughts: z.string().optional(),
  media: z.object({
    file: z.string().optional(),
    type: z.string().optional(),
  }),
  feeling: z.enum(feelings).optional(),
  location: z.string().optional(),
  gif: z.string().optional(),
});

export type createPostSchemaValuesType = z.infer<typeof createPostSchema>;
