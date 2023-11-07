import { courseDetailRoute } from '@pages/routes/courseRoutes.ts';
import { useParams } from '@tanstack/react-router';

function CourseDetail() {
    const { id } = useParams({ from: courseDetailRoute.id });
    return <div>Rendering detail for course {id}</div>;
}

export default CourseDetail;
