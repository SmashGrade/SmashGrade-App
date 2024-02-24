import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/curriculum/copy/$id')({
    parseParams: (params) => ({
        id: z.number().int().parse(parseInt(params.id)),
    }),
});
