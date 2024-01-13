import { courseDetailRoute } from '@pages/routes/courseRoutes.ts';
import { useParams } from '@tanstack/react-router';
import { ReactNode } from 'react';

function CourseDetail(): ReactNode {
    const { id } = useParams<typeof courseDetailRoute>({ from: '/course/$id' });
    return <div>Rendering detail for course {id}</div>;
}

export default CourseDetail;
