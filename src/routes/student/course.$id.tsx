import StudentCourseDetail from '@features/student/course/StudentCourseDetail.tsx';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const Route = createFileRoute('/student/course/$id')({
  component: StudentCourseDetailPage,
  parseParams: (params) => ({
    id: z.number().int().parse(parseInt(params.id)),
  }),
});

function StudentCourseDetailPage() {
  const { id } = Route.useParams();

  return <StudentCourseDetail id={id} />;
}
