import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/module/copy/$id')({
  parseParams: (params) => ({
    id: z.number().int().parse(parseInt(params.id)),
  }),
});
