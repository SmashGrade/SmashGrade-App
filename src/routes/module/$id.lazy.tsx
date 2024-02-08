import ModuleDetail from '@features/course-admin/module/ModuleDetail.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/module/$id')({
  component: ModuleDetail,
});
