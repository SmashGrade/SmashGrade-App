import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/module/$id')({
  parseParams: (params) => ({
    id: z.number().int().parse(parseInt(params.id)),
  }),
});
