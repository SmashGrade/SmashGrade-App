import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { getModule } from '@features/course-admin/module/moduleApi.ts';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/module/$id')({
  parseParams: (params) => ({
    id: z.number().int().parse(parseInt(params.id)),
  }),
  loader: ({ context, params }) => {
    return context.queryClient.ensureQueryData<ModuleResponseNew>({
      queryKey: ['module', params.id],
      queryFn: () => getModule(params.id),
    });
  },
});
