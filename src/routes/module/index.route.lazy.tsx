import ModuleList from '@features/course-admin/module/ModuleList.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/module/')({
  component: ModuleList,
});
