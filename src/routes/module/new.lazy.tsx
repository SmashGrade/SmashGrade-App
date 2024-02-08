import NewModule from '@features/course-admin/module/NewModule.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/module/new')({
  component: NewModule,
});
