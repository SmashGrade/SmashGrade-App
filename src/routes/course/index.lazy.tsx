import CourseList from '@features/course-admin/CourseList.tsx';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/course/')({ component: CourseList });
