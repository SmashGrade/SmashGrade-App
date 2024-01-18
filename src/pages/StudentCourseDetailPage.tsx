import StudentCourseDetail from '@features/student/course/StudentCourseDetail.tsx';
import { Route } from '../routes/student/course.$id.tsx';

export default function StudentCourseDetailPage() {
    const { id } = Route.useParams();

    return <StudentCourseDetail id={id} />;
}
