import { ReactNode } from 'react';
import { Route } from '../../routes/course/$id.tsx';

function CourseDetail(): ReactNode {
    const { id } = Route.useParams();
    return <div>Rendering detail for course {id}</div>;
}

export default CourseDetail;
