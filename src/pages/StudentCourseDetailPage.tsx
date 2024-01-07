import StudentCourseDetail from '@features/student/course/StudentCourseDetail.tsx';
import { studentCourseRoute } from '@pages/routes/studentRoutes.ts';
import { useParams } from '@tanstack/react-router';

export default function StudentCourseDetailPage() {
    const { id } = useParams<typeof studentCourseRoute>({ from: '/student/course/$id' });

    return <StudentCourseDetail id={id} />;
}
