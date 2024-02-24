import { EditModule } from '@features/course-admin/module/EditModule.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/module/$id')({
    component: EditModule,
});
