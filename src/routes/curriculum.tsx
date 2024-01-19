import { FileRoute } from '@tanstack/react-router';

export const Route = new FileRoute('/curriculum').createRoute({
    component: () => <div>PlaceholderCurriculumPage</div>,
});
